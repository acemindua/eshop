<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'public'    => $this->public,
            'parent'    => $this->whenLoaded('parent', fn() => new CategoryResource($this->parent)),
            'childs'    => CategoryResource::collection($this->whenLoaded('childs')),
            'items'     => ItemResource::collection($this->whenLoaded('items'))
        ];
    }
}
