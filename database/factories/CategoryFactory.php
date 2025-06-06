<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str; // Make sure Str is imported

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->word;

        return [
            'category_id' => null,
            'slug' => Str::slug($title),
            'public' => $this->faker->boolean,
            'order' => $this->faker->numberBetween(1, 100),
            'user_id' => User::factory(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Category $category) {
            $category->translations()->createMany([
                [
                    'locale' => 'en',
                    'title' => 'EN ' . $this->faker->unique()->word,
                   
                    'description' => $this->faker->text(100),
                    'content' => $this->faker->paragraph,
                    'meta_title' => $this->faker->sentence,
                    'meta_description' => $this->faker->text(150),
                    'meta_keywords' => $this->faker->words(5, true),
                ],
                [
                    'locale' => 'uk',
                    // To generate Ukrainian data, you need to use a Faker instance
                    // that is configured for 'uk_UA'.
                    // You can get this by calling the `fake()` helper with the locale.
                    'title' => 'UA ' . \Faker\Factory::create('uk_UA')->unique()->word,
                    
                    'description' => \Faker\Factory::create('uk_UA')->text(100),
                    'content' => \Faker\Factory::create('uk_UA')->paragraph,
                    'meta_title' => \Faker\Factory::create('uk_UA')->sentence,
                    'meta_description' => \Faker\Factory::create('uk_UA')->text(150),
                    'meta_keywords' => \Faker\Factory::create('uk_UA')->words(5, true),
                ]
            ]);
        });
    }

    public function childOf(?int $parentId = null): Factory
    {
        return $this->state(fn(array $attributes) => [
            'category_id' => $parentId ?? Category::inRandomOrder()->first()?->id,
        ]);
    }
}
