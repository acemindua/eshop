<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'title'     => $this->title,
            'url'       => LaravelLocalization::getLocalizedURL(app()->getLocale(), route('resolve.route', ['slug' => $this->slug])),
            'seo'       => [
                'title'         => $this->meta_title ?? $this->title,
                'description'   => $this->description,
            ],
            'slug'      => $this->slug,
            'public'    => $this->public,
            'parent'    => $this->whenLoaded('parent', fn() => new CategoryResource($this->parent)),
            'childs'    => CategoryResource::collection($this->whenLoaded('childs')),
            'items'     => ItemResource::collection($this->whenLoaded('items')),
            'images'    => $this->sorted_images ?? [],
        ];
    }
}
