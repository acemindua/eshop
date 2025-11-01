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
        $translation = $this->translations->first();

        return [
            'id'    => $this->id,
            'title' => $this->title ?: $translation->title,
            'slug'  => $this->slug ?: $translation->slug,
            'content'   => $this->content ?:  $translation->content,
            'public'    => (bool) $this->public,
        ];
    }
}
