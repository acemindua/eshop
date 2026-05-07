<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
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
                'code' => 'cash',
                'name' => 'Оплата при отриманні',
                'is_active' => true,
                'settings' => [],
                'sort_order' => 2,
                'translations' => [
                    'uk' => [
                        'title' => 'Післяплата',
                        'description' => 'Оплата готівкою або картою при отриманні у відділенні або кур’єру.'
                    ],
                    'en' => [
                        'title' => 'Cash on Delivery',
                        'description' => 'Pay by cash or card upon receipt at the delivery point or to the courier.'
                    ],
                    'pl' => [
                        'title' => 'Płatność przy odbiorze',
                        'description' => 'Zapłać gotówką lub kartą przy odbiorze w punkcie dostawy lub u kuriera.'
                    ],
                ]
            ],
            [
                'code' => 'invoice',
                'name' => 'Безготівковий розрахунок',
                'is_active' => true, // Змінив на true, щоб був доступний
                'settings' => [
                    'iban' => '',
                    'edrpou' => '',
                ],
                'sort_order' => 3,
                'translations' => [
                    'uk' => [
                        'title' => 'Безготівковий розрахунок',
                        'description' => 'Оплата на розрахунковий рахунок ФОП (IBAN). Рахунок буде надісланий після підтвердження.',
                        'payment_details' => "Отримувач: ФОП Кондюх Роман Євгенович\nIBAN: UA...\nПризначення: Оплата за замовлення"
                    ],
                    'en' => [
                        'title' => 'Bank Transfer',
                        'description' => 'Payment to the entrepreneur\'s bank account (IBAN). An invoice will be sent after confirmation.',
                        'payment_details' => "Beneficiary: FOP Kondiukh Roman Yevhenovych\nIBAN: UA...\nReference: Order payment"
                    ],
                    'pl' => [
                        'title' => 'Przelew bankowy',
                        'description' => 'Płatność na rachunek bankowy przedsiębiorcy (IBAN). Faktura zostanie wysłana po potwierdzeniu.',
                        'payment_details' => "Odbiorca: FOP Kondiukh Roman Yevhenovych\nIBAN: UA...\nTytułem: Płatność za zamówienie"
                    ],
                ]
            ],
        ];

        foreach ($methods as $data) {
            $translations = $data['translations'];
            unset($data['translations']);

            // Видаляємо 'name', оскільки цієї колонки немає в основній таблиці payment_methods
            unset($data['name']);

            $method = PaymentMethod::updateOrCreate(
                ['code' => $data['code']],
                $data // Тепер тут тільки code, is_active, settings, sort_order
            );

            // Оновлюємо переклади (назви 'title' підуть сюди)
            foreach ($translations as $locale => $translationData) {
                $method->translations()->updateOrCreate(
                    ['locale' => $locale],
                    $translationData
                );
            }
        }
    }
}
