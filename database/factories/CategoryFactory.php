<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'public'    => $this->faker->boolean(80),
            'order'     => $this->faker->unique()->numberBetween(1, 1000),
            'category_id' => null,
        ];
    }

    /**
     * Configure the category with specific title and optional parent.
     */
    public function withRealisticData(string $title, ?int $categoryId = null): static
    {
        return $this->state([
            'category_id' => $categoryId,
        ])->afterCreating(function (Category $category) use ($title) {
            $locales = array_keys(LaravelLocalization::getSupportedLocales());
            $translations = [];

            foreach ($locales as $locale) {
                $translations[] = [
                    'locale'           => $locale,
                    'title'            => $title,
                    'slug'             => Str::slug($title),
                    'description'      => $this->faker->text(100),
                    'content'          => $this->faker->paragraph,
                    'meta_title'       => "Buy {$title} - Best selection",
                    'meta_description' => "Find the best {$title} in our catalog. Fast shipping and high quality.",
                    'meta_keywords'    => "{$title}, shop, e-commerce",
                ];
            }
            $category->translations()->createMany($translations);
        });
    }
}
