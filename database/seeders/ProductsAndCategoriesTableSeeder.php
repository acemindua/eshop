<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class ProductsAndCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Root Categories (Level 0)
        // Let's create fewer root categories to have more subcategories
        $rootCategories = Category::factory()
            ->count(5) // Create 5 root categories
            ->create();

        // 2. Create Subcategories (Level 1) for each Root Category
        foreach ($rootCategories as $rootCategory) {
            Category::factory()
                ->count(rand(2, 4)) // 2 to 4 subcategories for each root
                ->childOf($rootCategory->id) // Assign parent_id
                ->has(Product::factory()->count(rand(10, 30))) // Products directly under this L1 category
                ->create()
                ->each(function (Category $level1Category) {
                    // 3. Create Sub-Subcategories (Level 2) for some Level 1 Categories
                    if (rand(0, 1)) { // Randomly create Level 2 categories for about half of L1 categories
                        Category::factory()
                            ->count(rand(1, 3)) // 1 to 3 sub-subcategories
                            ->childOf($level1Category->id) // Assign parent_id
                            ->has(Product::factory()->count(rand(5, 15))) // Products directly under this L2 category
                            ->create()
                            ->each(function (Category $level2Category) {
                                // 4. Optionally, create Level 3 categories for some Level 2 categories
                                if (rand(0, 1)) {
                                    Category::factory()
                                        ->count(rand(1, 2)) // 1 to 2 sub-sub-subcategories
                                        ->childOf($level2Category->id)
                                        ->has(Product::factory()->count(rand(2, 10))) // Products directly under this L3 category
                                        ->create();
                                }
                            });
                    }
                });
        }

        // Create some products directly under root categories if you wish, or ensure above logic covers it.
        // For example, if you want some products directly under the top level:
        // Category::factory()->count(5)->has(Product::factory()->count(50))->create();
        // The above loop already handles products at each level.

        // Create permissions
        $this->createPermissionsForModel('product');
        $this->createPermissionsForModel('category');
    }

    /**
     * Створення прав доступу для вказаної моделі.
     */
    protected function createPermissionsForModel(string $modelName): void
    {
        $actions = ['view', 'create', 'update', 'delete'];

        foreach ($actions as $action) {
            $permissionName = "{$modelName}-{$action}";

            Permission::firstOrCreate(
                ['name' => $permissionName, 'guard_name' => 'web']
            );
        }
    }
}
