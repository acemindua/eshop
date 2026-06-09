<?php

declare(strict_types=1);

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use RuntimeException;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * Class MediaService
 *
 * Core service orchestration layer handling generic polymorphic operations
 * for Spatie MediaLibrary within the application ecosystem.
 *
 * @package App\Services
 */
class MediaService
{
    /**
     * Dynamically resolve the fully qualified model class name from a generic type string.
     *
     * @param string $type The singular, studly-cased domain model identifier (e.g., 'Product', 'Category').
     * @return string|null The fully qualified class name if verified, otherwise null.
     */
    protected function resolveModelClass(string $type): ?string
    {
        $class = 'App\\Models\\' . Str::studly($type);

        return class_exists($class) ? $class : null;
    }

    /**
     * Retrieve a validated database model instance enforcing media-capability restrictions.
     *
     * @param string $type The generic identifier of the domain model.
     * @param int $id The primary key identifier of the model record.
     * @return Model|null Instance of the model implementing HasMedia, or null if validation fails.
     */
    protected function getModelInstance(string $type, int $id): ?Model
    {
        $modelClass = $this->resolveModelClass($type);

        if (!$modelClass || !is_subclass_of($modelClass, HasMedia::class)) {
            Log::warning("Media tracking blocked: Model type '{$type}' is unresolvable or missing HasMedia interface.");
            return null;
        }

        return $modelClass::find($id);
    }

    /**
     * Transform an Eloquent Media instance into a standardized Data Transfer Object (DTO) array structure.
     *
     * @param Media $media The foundational Spatie Media model entity.
     * @return array<string, mixed> Standardized associative array structure optimized for front-end consumption.
     */
    protected function transformMedia(Media $media): array
    {
        return [
            'id'        => $media->id,
            'url'       => $media->getUrl(),
            'preview'   => $media->hasGeneratedConversion('preview') ? $media->getUrl('preview') : null,
            'name'      => $media->file_name,
            'size'      => $media->size,
            'mime_type' => $media->mime_type,
            'order'     => $media->order_column,
        ];
    }

    /**
     * Fetch and transform all active media records bound to a specific model instance and target collection.
     *
     * @param string $type The target generic model type.
     * @param int $id The primary key record identifier.
     * @param string $collection The target media collection string identifier (e.g., 'images').
     * @return Collection<int, array<string, mixed>> Collection containing standardized media DTO structures.
     * @throws RuntimeException If target model cannot be evaluated or lacks interface support.
     */
    public function getMedia(string $type, int $id, string $collection): Collection
    {
        $model = $this->getModelInstance($type, $id);

        if (!$model) {
            throw new RuntimeException("Media pipeline extraction failed: Model '{$type}' with ID {$id} is inaccessible.");
        }

        return $model->getMedia($collection)
            ->map(fn(Media $media) => $this->transformMedia($media));
    }

    /**
     * Handle state validation, custom naming generation, and permanent ingestion of uploaded assets into storage.
     *
     * @param string $type The recipient generic model type.
     * @param int $id The primary key identifier of the parent model instance.
     * @param string $collection Target storage structure collection name.
     * @param array<UploadedFile> $files Collection of raw binaries received from HTTP request lifecycle.
     * @return array<int, array<string, mixed>> Array of transformed media payload entries successfully committed.
     * @throws RuntimeException If verification context fails before ingestion loop triggers.
     */
    public function storeMedia(string $type, int $id, string $collection, array $files): array
    {
        $model = $this->getModelInstance($type, $id);

        if (!$model) {
            throw new RuntimeException("Media persistence pipeline failed: Destination context for model '{$type}' is unresolvable.");
        }

        $uploaded = [];

        foreach ($files as $file) {
            if (!$file instanceof UploadedFile || !$file->isValid()) {
                Log::warning("Skipping asset upload iteration: Corrupted or invalid binary structure detected for model {$type} ID {$id}.");
                continue;
            }

            // Extract model contexts to assemble optimized SEO-friendly structures
            $baseName = $model->slug ?? $model->title ?? $model->name ?? 'asset';
            $extension = $file->getClientOriginalExtension();
            $obfuscationHash = Str::random(8);
            $sanitizedFileName = sprintf('%s-%s.%s', Str::slug((string) $baseName), $obfuscationHash, $extension);

            try {
                $media = $model->addMedia($file)
                    ->usingFileName($sanitizedFileName)
                    ->toMediaCollection($collection);

                $uploaded[] = $this->transformMedia($media);
            } catch (Exception $e) {
                Log::error("Media engine storage exception triggered for model {$type} ID {$id}: " . $e->getMessage());
            }
        }

        return $uploaded;
    }

    /**
     * Batch sync and overwrite the order sequence attributes for specified media records.
     *
     * @param string $type The generic type definition of the parent entity.
     * @param int $id Database entry identifier of the model context.
     * @param array<int, int> $order A sequential index-based zero-indexed array containing database Media record IDs.
     * @return bool True if operations executed without fault, false if entity validation breaks context boundaries.
     */
    public function sortMedia(string $type, int $id, array $order): bool
    {
        $model = $this->getModelInstance($type, $id);

        if (!$model) {
            return false;
        }

        try {
            // High-Performance Execution Loop: Circumvents standard iterative Eloquent hydration 
            // by performing targeted direct builder update requests on scoped child allocations.
            foreach ($order as $index => $mediaId) {
                $model->media()
                    ->where('id', (int) $mediaId)
                    ->update(['order_column' => $index + 1]);
            }

            $model->refresh();
            return true;
        } catch (Exception $e) {
            Log::error("Mass alignment process faulted on media collection sort structure for model {$type} ID {$id}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Execute permanent deletion request on targeted media assets and filesystems structures.
     *
     * @param int $id Explicit database row index inside media master structure.
     * @return bool True if filesystem structures and row indexes clear successfully, false otherwise.
     */
    public function deleteMedia(int $id): bool
    {
        $media = Media::find($id);

        if (!$media) {
            Log::info("Media deletion request bypassed: Record identifier {$id} no longer exists or was unallocated.");
            return false;
        }

        try {
            $media->delete();
            return true;
        } catch (Exception $e) {
            Log::error("Critical platform failure: Hard cleanup routine faulted for Media element identification ID {$id}: " . $e->getMessage());
            return false;
        }
    }
}
