<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Http\UploadedFile; // Import UploadedFile

// Assuming you have this custom path generator created
use App\Support\Media\ProductPathGenerator; // Make sure this path is correct
use Illuminate\Support\Facades\Log;

class MediaService
{
    /**
     * Dynamically resolve model class from type string.
     *
     * @param string $type The singular, studly-cased model name (e.g., 'Product', 'Category').
     * @return string|null The fully qualified class name if it exists, otherwise null.
     */
    protected function resolveModelClass(string $type): ?string
    {
        $class = 'App\\Models\\' . Str::studly($type);
        return class_exists($class) ? $class : null;
    }

    /**
     * Get a model instance that supports media.
     *
     * @param string $type The model type.
     * @param int $id The ID of the model.
     * @return Model|null The model instance, or null if not found or doesn't support HasMedia.
     */
    protected function getModelInstance(string $type, int $id): ?Model
    {
        $modelClass = $this->resolveModelClass($type);

        // Ensure the class exists and implements Spatie's HasMedia interface
        if (!$modelClass || !in_array(HasMedia::class, class_implements($modelClass))) {
            return null;
        }

        return $modelClass::find($id);
    }

    /**
     * Transform a Media object into a standardized array format.
     *
     * @param Media $media The Media model instance.
     * @return array The transformed media data.
     */
    protected function transformMedia(Media $media): array
    {
        return [
            'id' => $media->id,
            'url' => $media->getUrl(),
            // Check if the 'preview' conversion was generated before getting its URL
            'preview' => $media->hasGeneratedConversion('preview') ? $media->getUrl('preview') : null,
            'name' => $media->file_name, // Use file_name for the original filename
            'size' => $media->size,
            'mime_type' => $media->mime_type,
            'order' => $media->order_column,
        ];
    }

    ### Public API Methods

    /**
     * Retrieve media items for a specific model and collection.
     *
     * @param string $type The model type (e.g., 'Product').
     * @param int $id The ID of the model.
     * @param string $collection The media collection name (e.g., 'images').
     * @return Collection<array> A collection of transformed media arrays.
     * @throws \RuntimeException If the model cannot be found or does not support media.
     */
    public function getMedia(string $type, int $id, string $collection): Collection
    {
        $model = $this->getModelInstance($type, $id);
        if (!$model) {
            throw new \RuntimeException("Model of type '{$type}' with ID {$id} not found or does not support media.");
        }

        return $model->getMedia($collection)->map(fn(Media $media) => $this->transformMedia($media));
    }

    /**
     * Store one or more media files for a given model into a specified collection.
     * Filenames are generated based on the model's slug (if available and applicable).
     *
     * @param string $type The model type (e.g., 'Product').
     * @param int $id The ID of the model.
     * @param string $collection The media collection name (e.g., 'images').
     * @param array<UploadedFile> $files An array of UploadedFile instances.
     * @return array<array> An array of transformed data for the newly uploaded media items.
     * @throws \RuntimeException If the model cannot be found or does not support media.
     */
    public function storeMedia(string $type, int $id, string $collection, array $files): array
    {
        $model = $this->getModelInstance($type, $id);
        if (!$model) {
            throw new \RuntimeException("Model of type '{$type}' with ID {$id} not found or does not support media.");
        }

        $uploaded = [];

        foreach ($files as $file) {
            // Ensure we are dealing with a valid uploaded file
            if (!$file instanceof UploadedFile || !$file->isValid()) {
                Log::warning("Skipping invalid file provided for model {$type} ID {$id}.");
                continue; // Skip to the next file if invalid
            }

            // Generate a SEO-friendly filename based on the product's title/slug
            // This assumes your model has a 'title' or 'slug' attribute.
            // For translatable models, you might get the title from a specific locale.
            $baseName = $model->slug ?? $model->title ?? 'file'; // Use slug, then title, then generic 'file'
            $originalExtension = $file->getClientOriginalExtension();
            $uniqueId = Str::random(8); // Add a short unique string to prevent name collisions
            $fileName = Str::slug($baseName) . '-' . $uniqueId . '.' . $originalExtension;

            try {
                $media = $model->addMedia($file)
                    ->usingFileName($fileName) // Set the custom filename
                    ->toMediaCollection($collection);
                $uploaded[] = $this->transformMedia($media);
            } catch (\Exception $e) {
                // Log any exceptions during media storage but allow others to proceed
                Log::error("Failed to store media for model {$type} ID {$id}: " . $e->getMessage());
            }
        }

        return $uploaded;
    }

    /**
     * Sort media items for a given model based on a provided order.
     *
     * @param string $type The model type.
     * @param int $id The ID of the model.
     * @param array<int, int> $order An associative array where keys are media IDs and values are new sort orders.
     * @return bool True if sorting was attempted, false if the model could not be found.
     * Note: Individual media save failures are logged but don't stop the process.
     */
    public function sortMedia(string $type, int $id, array $order): bool
    {
        $model = $this->getModelInstance($type, $id);
        if (!$model) {
            Log::warning("Cannot sort media: Model of type '{$type}' with ID {$id} not found.");
            return false;
        }

        foreach ($order as $mediaId => $sortOrder) {
            // Find the media by ID and ensure it belongs to the current model
            $media = Media::where('id', $mediaId)
                ->where('model_id', $model->id)
                ->where('model_type', $model::class)
                ->first();

            if ($media) {
                try {
                    $media->order_column = (int) $sortOrder; // Ensure sortOrder is an integer
                    $media->save();
                } catch (\Exception $e) {
                    Log::error("Failed to save order for media ID {$mediaId} for model {$type} ID {$id}: " . $e->getMessage());
                }
            } else {
                Log::warning("Media ID {$mediaId} not found or does not belong to model {$type} ID {$id} during sort operation.");
            }
        }

        return true;
    }

    /**
     * Delete a specific media item by its ID.
     *
     * @param int $id The ID of the media item to delete.
     * @return bool True if the media item was successfully deleted, false otherwise.
     */
    public function deleteMedia(int $id): bool
    {
        $media = Media::find($id);

        if (!$media) {
            return false; // Media item not found
        }

        try {
            $media->delete();
            return true;
        } catch (\Exception $e) {
            Log::error("Failed to delete media ID {$id}: " . $e->getMessage());
            return false; // Deletion failed
        }
    }
}
