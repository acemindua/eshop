<?php

namespace Database\Seeders;

use App\Models\Setting;
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
                'key'   => 'show_inactive_products',
                'value' => '0',
                'label' => 'Show inactive products',
                'type'  => 'bool',
            ],
            [
                'key'   => 'enable_reviews',
                'value' => '1',
                'label' => 'Enable product reviews',
                'type'  => 'bool',
            ],
            [
                'key'   => 'items_per_page',
                'value' => '12',
                'label' => 'Quantity of items per page',
                'type'  => 'int',
            ],

        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                [
                    'value' => $setting['value'],
                    'label' => $setting['label'],
                    'type'  => $setting['type'],
                ]
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
