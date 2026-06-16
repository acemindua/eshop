<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
        return [
            'price'      => $this->faker->randomFloat(2, 100, 50000),
            'quantity'   => $this->faker->numberBetween(0, 100),
            'public'     => true,
            'order'      => $this->faker->unique()->numberBetween(1, 10000),
        ];
    }

    /**
     * @param string $title - назва товару
     * @param int|null $categoryId
     * @param int|null $brandId
     * @param string|null $imageUrl - URL до зображення
     */
    public function withRealisticData(string $title, ?int $categoryId = null, ?int $brandId = null, ?string $imageUrl = null): static
    {
        return $this->state([
            'category_id' => $categoryId,
            'brand_id'    => $brandId,
        ])->afterCreating(function (Item $item) use ($title, $imageUrl) {

            // 1. Media
            if ($imageUrl) {
                try {
                    $item->addMediaFromUrl($imageUrl)->toMediaCollection('images');
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::warning("Item #{$item->id} image skip: " . $e->getMessage());
                }
            }

            // 2. Translations
            $locales = array_keys(LaravelLocalization::getSupportedLocales());
            $translations = [];
            foreach ($locales as $locale) {
                $translations[] = [
                    'locale'           => $locale,
                    'title'            => $title,
                    'slug'             => Str::slug($title . '-' . uniqid()),
                    'description'      => $this->faker->text(200),
                    'content'          => $this->faker->paragraph(5),
                    'meta_title'       => "Buy {$title} - Best Offer",
                    'meta_description' => "High quality {$title} available now.",
                    'meta_keywords'    => "shop, {$title}, product",
                ];
            }
            $item->translations()->createMany($translations);
        });
    }
}
