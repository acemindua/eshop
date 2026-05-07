<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShippingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Перевіряємо, чи це запит від адміністратора (залежить від вашої логіки авторизації)
        $isAdmin = $request->user()?->can('manage shippings');

        return [
            'id'         => $this->id,
            'alias'      => $this->alias,
            'name'       => $this->name,
            'is_active'  => $this->is_active,
            'sort_order' => $this->sort_order,

            // Для адмінки віддаємо всі налаштування, 
            // для фронтенду — тільки публічні (наприклад, адресу складу)
            'settings'   => $isAdmin ? $this->settings : $this->getPublicSettings(),

            'updated_at' => $this->updated_at?->format('d.m.Y H:i'),
        ];
    }

    /**
     * Фільтруємо чутливі дані (ключі API) для звичайних користувачів
     */
    protected function getPublicSettings(): array
    {
        $settings = $this->settings ?? [];

        // Видаляємо приватні ключі перед відправкою на фронтенд
        unset($settings['api_key'], $settings['api_secret'], $settings['token']);

        return $settings;
    }
}
