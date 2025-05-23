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
            'id'            => $this->id,
            'title'         => $this->title,
            'description'   => $this->description,
            'content'       => $this->content,
            'price'     => $this->price,
            'quantity'  => $this->quantity,
            'slug'      => [
                'product' => $this->slug,
                'variant' => null, // <-- завжди є ключ variant
            ],
            'images'    => $this->sorted_images,
            'status'    => $this->public ? true : false,
            'variants'  => ProductVariantResource::collection($this->variants)
            //'category'  => $this->category ? new CategoryResource($this->category) : null,
            //'country'   => $this->country ? new CountryResource($this->country) : null,
            //'manufacturer'  => $this->manufacturer ? new ManufacturerResource($this->manufacturer) : null,
        ];
    }
}
