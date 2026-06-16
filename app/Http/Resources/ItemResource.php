<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class ItemResource extends JsonResource
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
            'quantity'     => $this->quantity,
            'description'  => $this->description,
            'price'        => $this->price,
            'old_price'    => $this->old_price,
            'images'       => $this->sorted_images ?? [],
            'public'       => $this->public,
            'category'     => $this->whenLoaded('category', fn() => new CategoryResource($this->category)),
            'brand'         => $this->whenLoaded('brand', fn() => new BrandResource($this->brand)),
            'seo'          => [
                'title' => $this->meta_title
            ],

            // Динамічний Comfy-орієнтований рейтинг
            'average_reviews' => [
                'rating'    => $this->overallAverageRating(),
                'total'     => $this->totalReviews()

            ],
        ];
    }
}
