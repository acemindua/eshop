<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $methods = [
            [
                'code' => 'monobank',
                'name' => 'Оплата картою (Monopay)',
                'is_active' => true,
                'settings' => [
                    'token' => '',
                    'vchasno_token' => '',
                    'vchasno_cid' => '',
                ],
                'sort_order' => 1,
            ],
            [
                'code' => 'cash',
                'name' => 'Оплата при отриманні',
                'is_active' => true,
                'settings' => [],
                'sort_order' => 2,
            ],
            [
                'code' => 'invoice',
                'name' => 'Безготівковий розрахунок',
                'is_active' => false,
                'settings' => [
                    'iban' => '',
                    'edrpou' => '',
                ],
                'sort_order' => 3,
            ],
        ];

        foreach ($methods as $method) {
            \App\Models\PaymentMethod::updateOrCreate(['code' => $method['code']], $method);
        }
    }
}
