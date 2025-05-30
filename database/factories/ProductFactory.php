<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
            'title' => $this->faker->unique()->word,
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraph(),
            'meta_title' => $this->faker->sentence(3),
            'meta_description' => $this->faker->paragraph(),
            'meta_keywords' => implode(',
            ', $this->faker->words(rand(3, 7))),
            'price' => $this->faker->randomFloat(2, 10, 1000), // ціна від 10 до 1000 грн
            'quantity' => $this->faker->numberBetween(0, 500), // залишок на складі
            'user_id' => 1,
            'country_id' => rand(1, 195),
        ];
    }
}
