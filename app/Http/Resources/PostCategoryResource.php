<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostCategoryResource extends JsonResource
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
            'status'    => $this->public ? true : false,
            'parent'    => $this->parent ? new PostCategoryResource($this->parent) : null,
            'childs'    => PostCategoryResource::collection($this->whenLoaded('childs')),
        ];
    }
}
