<?php

namespace Database\Seeders; // ДОДАЙТЕ ЦЕЙ РЯДОК

use App\Models\Shipping;
use Illuminate\Database\Seeder;

class ShippingSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            [
                'alias' => 'nova_poshta',
                'title' => 'Нова Пошта',
                'is_active' => true,
                'sort_order' => 1,
                'settings' => [ // Завдяки casts у моделі можна передавати масив
                    'api_key' => '',
                    'mode' => 'warehouse',
                    'markup' => 0,
                ],
            ],
            [
                'alias' => 'delivery',
                'title' => 'Delivery (Делівері)',
                'is_active' => true,
                'sort_order' => 2,
                'settings' => [
                    'api_key' => '',
                    'min_weight' => 50,
                ],
            ],
            [
                'alias' => 'ukr_poshta',
                'title' => 'Укрпошта',
                'is_active' => false,
                'sort_order' => 3,
                'settings' => ['api_key' => ''],
            ],
            [
                'alias' => 'pickup',
                'title' => 'Самовивіз зі складу',
                'is_active' => true,
                'sort_order' => 4,
                'settings' => [
                    'address' => 'м. Львів, вул. Промислова, 1',
                    'work_hours' => 'Пн-Пт: 09:00 - 18:00',
                ],
            ],
        ];

        foreach ($methods as $method) {
            Shipping::updateOrCreate(['alias' => $method['alias']], $method);
        }
    }
}
