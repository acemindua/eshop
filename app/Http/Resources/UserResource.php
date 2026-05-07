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
            "id"           => $this->id,
            "name"         => $this->name,          // Ім'я
            "last_name"    => $this->last_name,     // Прізвище
            "middle_name"  => $this->middle_name,   // По-батькові
            "full_name"    => $this->full_name,     // Аксесор Прізвище + Ім'я

            "email"        => $this->email,
            "phone"        => $this->phone,

            "avatar"       => $this->avatar,
            "online"       => $this->online(),

            'role'         => $this->roles->first()->name,

            // Маркетинг та лояльність
            "birthday"     => $this->birthday ? $this->birthday->format('Y-m-d') : null,
            "gender"       => $this->gender,
            "bonus_balance" => (float) $this->bonus_balance,
            "newsletter"   => (bool) $this->newsletter_accepted,

            // Налаштування та логістика
            "locale"       => $this->preferred_locale,
            "city_ref"     => $this->default_city_ref,
            "warehouse_ref" => $this->default_warehouse_ref,

            // Дата та час
            "last_activity_raw" => $this->last_activity,
            "last_activity"     => $this->last_activity ? $this->last_activity->diffForHumans() : null,
            "created_at"        => $this->created_at ? $this->created_at->format('d.m.Y') : null,
        ];
    }
}
