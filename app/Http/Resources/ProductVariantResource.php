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
            'title'     => $this->attribute_value_title,
            'image'     => $this->image,
            'slug'      => $this->product ?  $this->product->slug : null,
            'status'    => $this->public ? true : false,
            /* 'product'   => $this->product ? [
                'id'    => $this->product->id,
                'title' => $this->product->title,
            ] : null,
            'category' => $this->product->category ? [
                'id'    => $this->product->category->id,
                'title' => $this->product->category->title,
            ] : null,
            'title'     => $this->attribute_value_title,
            
            
             */
        ];
    }
}
