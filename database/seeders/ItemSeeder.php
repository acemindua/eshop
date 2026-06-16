<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use App\Models\Brand;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        // Отримуємо всі категорії та бренди, щоб прив'язати до них товари
        $categories = Category::all();
        $brands = Brand::all();

        if ($categories->isEmpty() || $brands->isEmpty()) {
            $this->command->warn('Спочатку засійте категорії та бренди!');
            return;
        }

        foreach ($categories as $category) {
            // Створюємо по 3 товари для кожної категорії
            for ($i = 1; $i <= 3; $i++) {
                $brand = $brands->random();

                Item::factory()
                    ->withRealisticData(
                        "Product {$i} in {$category->title}", // Назва товару
                        $category->id,                        // ID категорії
                        $brand->id,                           // ID бренду
                        'https://picsum.photos/800/800'        // Зображення
                    )
                    ->create();
            }
        }
    }
}
