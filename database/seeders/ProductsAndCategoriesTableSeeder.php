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
        Category::factory()
            ->has(Product::factory()->count(5))
            ->count(3)
            ->create();

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
