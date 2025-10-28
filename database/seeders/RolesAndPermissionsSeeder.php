<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        //Super User
        $role = Role::create(['name' => 'super-user']);
        $user = User::create([
            'name'      => 'Super User',
            'email'     => 'acemind.ua@gmail.com',
            'password'  => Hash::make('admin@admin'),
            'email_verified_at' => now(),
        ]);

        $user->assignRole('super-user');

        // Administrator
        $role = Role::create(['name' => 'administrator']);

        // create permissions for Model User
        Permission::create(['name' => 'user-view']);
        Permission::create(['name' => 'user-create']);
        Permission::create(['name' => 'user-update']);
        Permission::create(['name' => 'user-delete']);
        // create permissions for Model Roles
        Permission::create(['name' => 'role-view']);
        Permission::create(['name' => 'role-create']);
        Permission::create(['name' => 'role-update']);
        Permission::create(['name' => 'role-delete']);

        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'moder'])
            ->givePermissionTo(
                [
                    'user-view',
                    'user-update'
                ]
            );
        $role = Role::create(['name' => 'user']);
    }
}
