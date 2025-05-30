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
            'id'        => $this->id,
            'sku'       => $this->sku,
            'price'     => $this->price,
            'quantity'  => $this->quantity,
            'public'    => $this->public ? true : false,
            'order'     => $this->order,
            'values'    => $this->attribute_value ? [
                'id'    => $this->attribute_value->id,
                'title' => $this->attribute_value->title,
                'slug'  => $this->attribute_value->slug,
            ] : []
        ];
    }
}
