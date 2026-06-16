<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class BrandResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'url'          => LaravelLocalization::getLocalizedURL(app()->getLocale(), route('resolve.route', ['slug' => $this->slug])),
            'description'  => $this->description,
            'image'        => $this->image,
            'public'       => $this->public,
            'seo'          => [
                'title' => $this->meta_title
            ]
        ];
    }
}
