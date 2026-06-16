<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/**
 * @extends Factory<Brand>
 */
class BrandFactory extends Factory
{
    protected $model = Brand::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'public' => $this->faker->boolean(80),
            'order'  => $this->faker->unique()->numberBetween(1, 1000),
        ];
    }

    /**
     * State for generating realistic data with custom titles and logo URLs.
     * * @param string $title
     * @param string|null $logoUrl
     * @return static
     */
    public function withRealisticData(string $title, ?string $logoUrl = null): static
    {
        return $this->afterCreating(function (Brand $brand) use ($title, $logoUrl) {
            // 1. Handle Media Processing
            if ($logoUrl) {
                try {
                    $brand->addMediaFromUrl($logoUrl)
                        ->toMediaCollection('images');
                } catch (\Exception $e) {
                    Log::error("MediaFactory: Failed to process remote image for Brand [{$brand->id}]: " . $e->getMessage());
                }
            }

            // 2. Generate Localized Translations
            $locales = array_keys(LaravelLocalization::getSupportedLocales());
            $translations = [];

            foreach ($locales as $locale) {
                $translations[] = [
                    'locale'           => $locale,
                    'title'            => $title,
                    'slug'             => Str::slug($title),
                    'description'      => $this->faker->paragraph(2),
                    'content'          => $this->faker->text(500),
                    'meta_title'       => "Official distributor of {$title} - Best prices",
                    'meta_description' => "Shop high-quality products from {$title}. Expert support and fast delivery available.",
                    'meta_keywords'    => implode(', ', $this->faker->words(5)),
                ];
            }

            $brand->translations()->createMany($translations);
        });
    }
}
