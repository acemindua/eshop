<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseResource extends JsonResource
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
            'city'          => $this->city,
            'address'       => $this->address,
            'phone'         => $this->phone,
            'working_hours' => $this->working_hours,
            'map_link'      => $this->map_link,
            'is_active'     => (bool) $this->is_active,
            'sort_order'    => (int) $this->sort_order,

            // Медіа (фото складу)
            'image'         => $this->getFirstMediaUrl('images'),
            'thumbnail'     => $this->getFirstMediaUrl('images', 'thumb'), // якщо є конверсії

            'created_at'    => $this->created_at?->format('d.m.Y H:i'),
        ];
    }
}
