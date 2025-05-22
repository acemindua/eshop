<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- Параметри налаштувань ---
        $settings = [
            [
                'key' => 'show_inactive_products',
                'value' => '0',
                'label' => 'Показувати неактивні товари',
            ],
            /*   [
                'key' => 'enable_reviews',
                'value' => '1',
                'label' => 'Увімкнути відгуки',
            ], */
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'label' => $setting['label']]
            );
        }

        // --- Додати дозволи для моделі ---
        $modelName = 'setting'; // змінити за потреби
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
