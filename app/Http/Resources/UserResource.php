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
            'id'        => $this->id,
            'name'      => $this->name,
            'surname'   => $this->surname,
            'full_name' => $this->full_name,
            'email'     => $this->email,
            'phone'     => $this->phone,
            'avatar'    => $this->avatar,
            'role'      => $this->roles->first()->name ?? null,
            'verify'    => (bool) $this->email_verified_at,
            'online'    => $this->online(),
            'last_seen' => optional($this->last_seen)->diffForHumans(),
        ];

    }
}
