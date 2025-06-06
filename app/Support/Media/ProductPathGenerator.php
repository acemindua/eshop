<?php

namespace App\Support\Media;

use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Support\Str;

class ProductPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        // Use the model's slug for the directory name.
        // This is especially good for products as slugs are unique and SEO-friendly.
        // If the model doesn't have a slug (e.g., non-Product models), use a fallback like 'other-media'.
        $directoryName = $media->model->slug ?? 'other-media';

        // Example path: storage/app/public/products/sira-granulyovana-siarkopol/
        return Str::plural($media->model->getTable()) . '/' . $directoryName . '/';
    }

    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media) . 'conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media) . 'responsive-images/';
    }
}
