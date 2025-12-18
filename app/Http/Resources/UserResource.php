<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"        => $this->id,
            "name"      => $this->name,
            "email"     => $this->email,
            'avatar'    => $this->avatar,
            'full_name' => $this->full_name,
            'online'    => $this->online(),
            'last_activity'    => $this->last_activity ? \Carbon\Carbon::parse($this->last_activity)->diffForHumans() : null
        ];
    }
}
