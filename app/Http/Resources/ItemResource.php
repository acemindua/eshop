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
        // Перевіряємо наявність агрегованого поля з запиту, або вираховуємо через метод трейту
        $rating = !is_null($this->reviews_avg_rating)
            ? $this->reviews_avg_rating
            : $this->averageRating();

        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'quantity'     => $this->quantity,
            'description'  => $this->description,
            'price'        => $this->price,
            'old_price'    => $this->old_price,
            'images'       => $this->sorted_images ?? [],
            'public'       => $this->public,
            'category'     => new CategoryResource($this->category),
            'manufacturer' => new ManufacturerResource($this->manufacturer),
            'seo'          => [
                'title' => $this->meta_title
            ],

            // Динамічний Comfy-орієнтований рейтинг
            'average_reviews' => [
                'rating' => $rating ? round((float) $rating, 1) : 0,
                'count'  => (int) ($this->reviews_count ?? $this->reviews()->count()),
            ],
        ];
    }
}
