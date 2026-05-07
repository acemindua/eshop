<?php

namespace Database\Seeders;

use App\Models\AppVersion;
use Illuminate\Database\Seeder;

class AppVersionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Створюємо випущену версію (Changelog)
        $v1 = AppVersion::create([
            'version' => '1.0.0',
            'released_at' => now()->subDays(5),
            'is_active' => true
        ]);

        // Додаємо виконані завдання
        $v1->items()->createMany([
            [
                'content' => 'Перший стабільний реліз системи Ace Admin',
                'type' => 'feature',
                'category' => 'changelog',
                'is_completed' => true,
                'sort_order' => 1
            ],
            [
                'content' => 'Оптимізація запитів до бази даних',
                'type' => 'improvement',
                'category' => 'changelog',
                'is_completed' => true,
                'sort_order' => 2
            ],
        ]);

        // 2. Створюємо майбутню версію (Roadmap / Плани)
        $v2 = AppVersion::create([
            'version' => '1.1.0',
            'released_at' => null, // Дата порожня, бо це плани
            'is_active' => true
        ]);

        // Додаємо заплановані завдання
        $v2->items()->createMany([
            [
                'content' => 'Інтеграція з API складського обліку',
                'type' => 'feature',
                'category' => 'roadmap',
                'is_completed' => false,
                'sort_order' => 1
            ],
            [
                'content' => 'Темна тема для панелі керування',
                'type' => 'improvement',
                'category' => 'roadmap',
                'is_completed' => false,
                'sort_order' => 2
            ],
            [
                'content' => 'Виправлення відображення таблиць на мобільних пристроях',
                'type' => 'fix',
                'category' => 'roadmap',
                'is_completed' => false,
                'sort_order' => 3
            ],
        ]);
    }
}
