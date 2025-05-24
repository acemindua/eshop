<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Page::factory()
            ->count(10)
            ->create();
            
        // --- Додати дозволи для моделі ---
        $modelName = 'page'; // змінити за потреби
        $permissions = ['view', 'create', 'update', 'delete'];

        foreach ($permissions as $action) {
            $permissionName = "{$modelName}-{$action}";

            if (!Permission::where('name', $permissionName)->exists()) {
                Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'web',
                ]);
            }
        }
    }
}
