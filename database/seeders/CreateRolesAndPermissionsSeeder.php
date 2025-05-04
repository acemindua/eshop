<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class CreateRolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions for User
        Permission::create(['name' => 'user-view']);
        Permission::create(['name' => 'user-create']);
        Permission::create(['name' => 'user-update']);
        Permission::create(['name' => 'user-delete']);
        // create permissions for Roles
        Permission::create(['name' => 'role-view']);
        Permission::create(['name' => 'role-create']);
        Permission::create(['name' => 'role-update']);
        Permission::create(['name' => 'role-delete']);


        $role = Role::create(['name' => 'super-user']);

        // create roles and assign created permissions
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'moder'])
            ->givePermissionTo(
                [
                    'user-view',
                    'user-update'
                ]
            );
        $role = Role::create(['name' => 'auth']);
    }
}
