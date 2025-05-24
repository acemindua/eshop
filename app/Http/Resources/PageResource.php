<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
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
            'slug'          => $this->slug,
            'description'   => $this->description,
            'content'       => $this->content,
            'status'        => $this->public ? true : false,
            'meta_title'         => $this->meta_title,
            'meta_description'   => $this->meta_description,
            'meta_keywords'      => $this->meta_keywords,
        ];
    }
}
