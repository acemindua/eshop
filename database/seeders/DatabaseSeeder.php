<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            //Core
            OptionSeeder::class,
            RolesAndPermissionsSeeder::class,
            UserSeeder::class,
            PageSeeder::class,
            //OrderSeeder::class,
            //ShippingSeeder::class,
            //PaymentMethodSeeder::class,
            //AppVersionSeeder::class,
            //WarehouseSeeder::class,
            //Commerce
            //CategorySeeder::class,
            //BrandSeeder::class,
            //ItemSeeder::class,
        ]);
    }
}
