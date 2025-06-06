<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class CategoryAndPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        PostCategory::factory()->count(3)->create();

        // Предположим, категории уже существуют
        $categories = PostCategory::all();

        Post::factory()->count(50)->create()->each(function ($post) use ($categories) {
            // Привязка поста к случайной категории
            $post->post_category_id = $categories->random()->id;
            $post->save();
        });

        $this->createPermissionsForModel('post');
        $this->createPermissionsForModel('post_category');
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
