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
            'title'     => $this->title,
            'price'     => $this->price,
            'quantity'  => $this->quantity,
            'slug'      => $this->slug,
            'images'    => $this->sorted_images,
            'status'    => $this->public ? true : false,
            //'category'  => $this->category ? new CategoryResource($this->category) : null,
            //'country'   => $this->country ? new CountryResource($this->country) : null,
            //'manufacturer'  => $this->manufacturer ? new ManufacturerResource($this->manufacturer) : null,
            //'variants'      =>  $this->variants ? ProductVariantResource::collection($this->variants)  : null
        ];
    }
}
