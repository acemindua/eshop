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
            'product_id'    => $this->product_id,
            'sku'           => $this->sku,
            'price'         => $this->price,
            'quantity'      => $this->quantity,
            'public'        => $this->public,
            'order'         => $this->order,
            'variant_values' => ProductVariantValueResource::collection($this->values)
        ];
    }
}
