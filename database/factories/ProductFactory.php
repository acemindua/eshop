<?php

namespace Database\Factories;

use App\Models\User;    // Import User model
use App\Models\Product; // Import Product model
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str; // Import Str for slug generation

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class; // Explicitly define the model

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productTitle = $this->faker->unique()->words(rand(2, 4), true); // Generate a unique title as string

        return [
            'title' => $productTitle,
            'slug' => Str::slug($productTitle), // Generate a slug from the title
            'description' => $this->faker->paragraph(3), // More realistic paragraph length
            'content' => $this->faker->paragraphs(rand(3, 7), true), // Longer content, multiple paragraphs
            'meta_title' => $this->faker->unique()->sentence(rand(3, 6)), // Unique meta title
            'meta_description' => $this->faker->text(150), // Shorter text for description
            'meta_keywords' => implode(',', $this->faker->words(rand(3, 7))), // Keywords joined by ', '
            'price' => $this->faker->randomFloat(2, 10, 1000), // ціна від 10 до 1000 грн (as you had)
            'quantity' => $this->faker->numberBetween(0, 500), // залишок на складі (as you had)
            'public' => $this->faker->boolean(90), // 90% chance of being public
        

            // Using factory relationships for foreign keys
            'user_id' => User::factory(), // Creates a new user for each product if not provided
            'country_id' => rand(1, 130), // Creates a new country for each product
            // If you want to associate with an existing category, you'd do:
            // 'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            // The `?? Category::factory()` ensures a category is created if none exist.
            // Or if products belong to many categories, you'd use afterCreating for pivot table.
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Product $product) {
            // Example: If products can have multiple categories (many-to-many relationship)
            // Uncomment and adjust if your product has a many-to-many 'categories' relationship
            // $categories = Category::inRandomOrder()->limit(rand(1, 3))->pluck('id');
            // $product->categories()->attach($categories);

            // Example: If product has images (assuming an 'images' relationship)
            // $product->images()->create([
            //     'path' => 'products/' . $this->faker->uuid() . '.jpg',
            //     'order' => 1,
            // ]);
        });
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): Factory
    {
        return $this->state(fn(array $attributes) => [
            'quantity' => 0,
        ]);
    }

    /**
     * Indicate that the product is on sale.
     */
    public function onSale(): Factory
    {
        return $this->state(fn(array $attributes) => [
            'price' => $this->faker->randomFloat(2, 5, 500), // A lower price
            'on_home_page' => true, // Often on sale items are on homepage
        ]);
    }
}
