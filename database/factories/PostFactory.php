<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'public' => $this->faker->boolean,
            'order' => $this->faker->numberBetween(1, 100),
            'user_id' => User::factory(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Post $post) {
            $post->translations()->createMany([
                [
                    'locale' => 'en',
                    'title' => 'EN ' . fake()->sentence,
                    'slug' => fake()->slug,
                    'description' => fake()->text(100),
                    'content' => fake()->paragraph,
                    'meta_title' => fake()->sentence,
                    'meta_description' => fake()->text(150),
                    'meta_keywords' => fake()->words(5, true),
                ],
                [
                    'locale' => 'uk',
                    'title' => 'UA ' . fake('uk_UA')->sentence,
                    'slug' => fake('uk_UA')->slug,
                    'description' => fake('uk_UA')->text(100),
                    'content' => fake('uk_UA')->paragraph,
                    'meta_title' => fake('uk_UA')->sentence,
                    'meta_description' => fake('uk_UA')->text(150),
                    'meta_keywords' => fake('uk_UA')->words(5, true),
                ]
            ]);
        });
    }
}
