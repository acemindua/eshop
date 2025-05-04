<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph,
            'content' => $this->faker->paragraph,
            'slug' => fn(array $attributes) => Str::slug($attributes['title']),
            'user_id' => 1,
            'country_id' => rand(1, 195)
        ];
    }
}
