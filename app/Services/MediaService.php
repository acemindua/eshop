<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaService
{
    /**
     * Dynamically resolve model class from type string.
     */
    protected function resolveModelClass(string $type): ?string
    {
        $class = 'App\\Models\\' . Str::studly($type);
        return class_exists($class) ? $class : null;
    }

    /**
     * Get a model instance if it supports media.
     */
    protected function getModelInstance(string $type, int $id): ?Model
    {
        $modelClass = $this->resolveModelClass($type);

        if (!$modelClass || !in_array(HasMedia::class, class_implements($modelClass))) {
            return null;
        }

        return $modelClass::find($id);
    }

    /**
     * Transform a media object into array format.
     */
    protected function transformMedia(Media $media): array
    {
        return [
            'id' => $media->id,
            'url' => $media->getUrl(),
            'preview' => $media->hasGeneratedConversion('preview') ? $media->getUrl('preview') : null,
            'name' => $media->name,
            'size' => $media->size,
            'mime_type' => $media->mime_type,
            'order' => $media->order_column,
        ];
    }

    public function getMedia(string $type, int $id, string $collection): ?Collection
    {
        $model = $this->getModelInstance($type, $id);
        if (!$model) return null;

        return $model->getMedia($collection)->map(fn($media) => $this->transformMedia($media));
    }

    public function storeMedia(string $type, int $id, string $collection, array $files): ?array
    {
        $model = $this->getModelInstance($type, $id);
        if (!$model) return null;

        $uploaded = [];

        foreach ($files as $file) {
            $media = $model->addMedia($file)->toMediaCollection($collection);
            $uploaded[] = $this->transformMedia($media);
        }

        return $uploaded;
    }

    public function sortMedia(string $type, int $id, array $order): bool
    {
        $model = $this->getModelInstance($type, $id);
        if (!$model) return false;

        foreach ($order as $mediaId => $sortOrder) {
            $media = Media::find($mediaId);
            if ($media && $media->model_id === $model->id && $media->model_type === $model::class) {
                $media->order_column = $sortOrder;
                $media->save();
            }
        }

        return true;
    }

    public function deleteMedia(int $id): bool
    {
        $media = Media::find($id);

        if (!$media) {
            return false;
        }

        try {
            $media->delete();
            return true;
        } catch (\Exception) {
            return false;
        }
    }
}
