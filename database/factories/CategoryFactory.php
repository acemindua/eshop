<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
            'title' => $title = $this->faker->unique()->word,
            'description' => $this->faker->paragraph,
            'content' => $this->faker->paragraph,
            'slug' => Str::slug($title) . '-' . Str::uuid(),
            'user_id' => 1,
        ];
    }
}
