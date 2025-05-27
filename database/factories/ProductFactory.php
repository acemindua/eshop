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
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 10, 1000), // ціна від 10 до 1000 грн
            'quantity' => $this->faker->numberBetween(0, 500), // залишок на складі
            'user_id' => 1,
            'country_id' => rand(1, 195),
        ];
    }
}
