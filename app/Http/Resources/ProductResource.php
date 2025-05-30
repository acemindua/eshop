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
            'attributes'            => $this->attributeValues->groupBy(fn($val) => optional($val->attribute)->title)->map(function ($values, $attributeTitle) {
                return [
                    'title' => $attributeTitle,
                    // Використовуємо AttributeValueResource для трансформації кожного елемента
                    'values' => AttributeValueResource::collection($values),
                ];
            })->toArray(),
        ];
        /* return [
            'id'            => $this->id,
            'title'         => $this->title,
            'sku'           => $this->sku,
            'description'   => $this->description,
            'category'      => $this->category ? new CategoryResource($this->category) : null,
            'content'       => $this->content,
            'price'     => $this->price,
            'quantity'  => $this->quantity,
            'slug'      => [
                'product' => $this->slug,
                'variant' => null, // <-- завжди є ключ variant
            ],
            'images'    => $this->sorted_images,
            
            'variants'  => ProductVariantResource::collection($this->variants),
            'attributes' => $this->variants
                ->pluck('attribute_value')
                ->filter()
                ->unique('id')
                ->groupBy(fn($val) => optional($val->attribute)->title)

            //'country'   => $this->country ? new CountryResource($this->country) : null,
            //'manufacturer'  => $this->manufacturer ? new ManufacturerResource($this->manufacturer) : null,
        ]; */
    }
}
