<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'id'        => $this->id,
            'title'     => $this->title,
            'slug'      => $this->slug,
            'quantity'  => $this->quantity,
            'description'       => $this->description,
            'price'             => $this->price,
            'old_price'         => $this->old_price,
            'images'            => $this->sorted_images ?? [],
            'public'            => $this->public,
            'category'          => new CategoryResource($this->category),
            'manufacturer'      => new ManufacturerResource($this->manufacturer),
            'seo'               =>
            [
                'title' => $this->meta_title
            ],
            'average_reviews' => [
                'rating' => $this->average_rating
                    ? round((float) $this->average_rating, 1)
                    : 0,
                'count' => (int) ($this->ratings_count ?? 0),
            ],
        ];
    }
}
