<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'sku'       => $this->sku,
            'price'     => $this->price,
            'quantity'  => $this->quantity,
            'images'    => $this->sorted_images,
            'status'    => $this->public ? true : false,
            'slug'      => [
                'product' => $this->slug,
                'variant' => null, // <-- !!!
            ],
            'title'                 => $this->title,
            'description'           => $this->description,
            'content'               => $this->content,
            'meta_title'            => $this->meta_title,
            'meta_description'      => $this->meta_description,
            'meta_keywords'         => $this->meta_keywords,
            'category'              => $this->category ? $this->category->title : null,
            'attributes'            => $this->attributeValues->groupBy(fn($val) => optional($val->attribute)->title)->map(function ($values, $attributeTitle) {
                return [
                    'title' => $attributeTitle,
                    // Використовуємо AttributeValueResource для трансформації кожного елемента
                    'values' => AttributeValueResource::collection($values),
                ];
            })->toArray(),
        ];
    }
}
