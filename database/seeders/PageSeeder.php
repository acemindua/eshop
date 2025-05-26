<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Спочатку шукаємо чи створюємо сторінку по унікальному non-translatable полю, наприклад, по id чи order (якщо є)
        // Якщо нема такого, можна просто створити нову сторінку вручну і оновити переклади.

        $page = Page::firstOrCreate(
            ['id' => 1], // або інше унікальне поле для головної сторінки, або по якомусь фіксованому ключу
            ['public' => false, 'order' => 0] // заповни мінімальні поля таблиці pages
        );

        // 2. Далі встановлюємо перекладені поля через переклади
        foreach (config('translatable.locales') as $locale) {
            $page->translateOrNew($locale)->fill([
                'title' => 'Головна сторінка',
                'description' => 'Опис головної сторінки для SEO',
                'content' => '<p>Вітальний контент на головній сторінці</p>',
                'meta_title' => 'Головна сторінка - My App',
                'meta_description' => 'Опис головної сторінки для SEO',
                'meta_keywords' => 'головна, сторінка, seo',
            ]);
        }

        $page->save();

        // 3. Створюємо інші сторінки через фабрику
        Page::factory()->count(9)->create();

        // --- Додаємо дозволи ---
        $modelName = 'page';
        $permissions = ['view', 'create', 'update', 'delete'];

        foreach ($permissions as $action) {
            $permissionName = "{$modelName}-{$action}";

            if (!Permission::where('name', $permissionName)->exists()) {
                Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'web',
                ]);
            }
        }
    }
}
