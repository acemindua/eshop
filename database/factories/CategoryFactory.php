<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
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
            'user_id' => 1,
        ];
    }
}
