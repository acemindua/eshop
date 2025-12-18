<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $options = [
            [
                'key' => 'site_name',
                'value' => 'Мій Laravel Сайт',
                'description' => 'Назва вашого веб-сайту.',
            ],
            [
                'key' => 'site_tagline',
                'value' => 'Сайт, створений за допомогою Laravel.',
                'description' => 'Короткий слоган або опис сайту.',
            ],
            [
                'key' => 'admin_email',
                'value' => 'admin@example.com',
                'description' => 'Контактний email адміністратора.',
            ],
            [
                'key' => 'items_per_page',
                'value' => '10', // Зберігаємо як рядок, але використовуємо як число
                'description' => 'Кількість елементів на сторінку (для пагінації).',
            ]
        ];

        // Вставка даних
        foreach ($options as $option) {
            // Перевіряємо, чи вже існує ключ, щоб уникнути дублікатів при повторному запуску
            Option::firstOrCreate(
                ['key' => $option['key']],
                $option
            );
        }
    }
}
