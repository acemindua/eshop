<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    protected $model = Item::class;

    /**
     * Define the model's default state.
     * NOTE: This method must ONLY return an array of attributes for the main Page model.
     */
    public function definition(): array
    {
        $randomCategoryId = Category::inRandomOrder()->first()?->id;

        $imageUrl = 'https://loremflickr.com/640/640/product';

        return [
            'category_id'   => $this->faker->optional(0.8, null)->passthrough($randomCategoryId),
            'price'         => $this->faker->randomFloat(2, 1, 1000),
            'quantity'      => $this->faker->randomFloat(2, 1, 1000),
            'public'        => $this->faker->boolean(80),
            'order'         => $this->faker->unique()->numberBetween(1, 1000),
        ];
    }

    /**
     * Configure the model factory.
     * This is where translation logic goes, as it needs the model instance.
     */
    public function configure(): static
    {

        return $this->afterCreating(function (Item $item) {

            $imageUrl = 'https://picsum.photos/640/640'; // Випадкове зображення

            try {
                // Використовуємо fromUrl для завантаження та toMediaCollection для збереження
                $item->addMediaFromUrl($imageUrl)
                    ->toMediaCollection('images'); // 'images' - назва вашої медіа-колекції
            } catch (\Exception $e) {
                // Запобігання падінню фабрики, якщо зовнішній ресурс недоступний
                // У продакшн коді варто розглянути більш детальний лог
                echo "Помилка завантаження зображення для Item #{$item->id}: " . $e->getMessage() . "\n";
            }


            $locales = array_keys(LaravelLocalization::getSupportedLocales());
            $translate = [];
            foreach ($locales as $locale) {
                $title = $locale . '-' . fake()->sentence(3);
                $translate[] = [
                    'locale' => $locale,
                    'title' => $title,
                    'slug' => \Illuminate\Support\Str::slug($title),
                    'description' => fake()->text(100),
                    'content' => fake()->paragraph,
                    'meta_title' => fake()->sentence,
                    'meta_description' => fake()->text(150),
                    'meta_keywords' => fake()->words(5, true),
                ];
            }
            $item->translations()->createMany($translate);
        });
    }
}
