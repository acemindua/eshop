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
        // Логіка визначення адміна (можеш адаптувати під свою систему ролей)
        $isAdmin = $request->user()?->hasRole('admin');

        return [
            'id'          => $this->id,
            'alias'       => $this->alias,
            'title'        => $this->title,
            'description' => $this->description,
            'price'       => (float) $this->price,
            'is_active'        => $this->is_active,
            'sort_order'  => $this->sort_order,

            // Додаємо хелпери, щоб на фронті (Vue) легше було маніпулювати умовами
            'is_pickup'   => $this->isPickup(),
            'is_external' => $this->isExternal(),

            // Для адмінки віддаємо все, для фронту — фільтруємо
            'settings'    => $isAdmin ? $this->settings : $this->getPublicSettings(),

            'updated_at'  => $this->updated_at?->format('d.m.Y H:i'),
        ];
    }

    /**
     * Фільтруємо чутливі дані (ключі API) для звичайних користувачів
     */
    protected function getPublicSettings(): array
    {
        $settings = $this->settings ?? [];

        // Список ключів, які не мають потрапити в браузер
        $privateKeys = [
            'api_key',
            'api_secret',
            'token',
            'test_mode_key',
            'merchant_id'
        ];

        foreach ($privateKeys as $key) {
            unset($settings[$key]);
        }

        return $settings;
    }
}
