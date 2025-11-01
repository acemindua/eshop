<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class PageFactory extends Factory
{
    protected $model = Page::class;

    /**
     * Define the model's default state.
     * NOTE: This method must ONLY return an array of attributes for the main Page model.
     */
    public function definition(): array
    {
        return [
            'public' => $this->faker->boolean(80),
            'order' => $this->faker->unique()->numberBetween(1, 1000),
        ];
    }

    /**
     * Configure the model factory.
     * This is where translation logic goes, as it needs the model instance.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Page $page) {
            $locales = array_keys(LaravelLocalization::getSupportedLocales());
            $translate = [];
            foreach ($locales as $locale) {
                $title = fake()->sentence(3);
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
            $page->translations()->createMany($translate);
        });
    }
}
