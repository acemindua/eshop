<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantResource extends JsonResource
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
            'product_id'    => $this->product_id,
            'attribute' => $this->attribute ? [
                'id'    => $this->attribute->id,
                'title' => $this->attribute->title,
            ] : [],
            'attribute_value' => $this->attribute_value ? [
                'id'    => $this->attribute_value->id,
                'title' => $this->attribute_value->title,
                'slug'  => $this->attribute_value->slug,
            ] : [],
            'sku'       => $this->sku,
            'price'     => $this->price,
            'quantity'  => $this->quantity,
            'public'    => $this->public,
            'order'     => $this->order,
            'images'    => $this->sorted_images
        ];
    }
}
