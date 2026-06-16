<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Electronics
        $electronics = Category::factory()->withRealisticData('Electronics')->create();
        Category::factory()->withRealisticData('Smartphones', $electronics->id)->create();
        Category::factory()->withRealisticData('Laptops', $electronics->id)->create();

        // 2. Clothing
        $clothing = Category::factory()->withRealisticData('Clothing')->create();
        Category::factory()->withRealisticData('Shoes', $clothing->id)->create();
        Category::factory()->withRealisticData('T-shirts', $clothing->id)->create();

        // 3. Garden
        $garden = Category::factory()->withRealisticData('Garden Supplies')->create();
        Category::factory()->withRealisticData('Fertilizers', $garden->id)->create();
        Category::factory()->withRealisticData('Tools', $garden->id)->create();

        // 4. Other
        Category::factory()->withRealisticData('Books')->create();
    }
}
