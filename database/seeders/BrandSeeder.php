<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Apple',     'logo' => 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg'],
            ['name' => 'Samsung',   'logo' => 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg'],
            ['name' => 'Xiaomi',    'logo' => 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg'],
            ['name' => 'Sony',      'logo' => 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg'],
            ['name' => 'LG',        'logo' => 'https://upload.wikimedia.org/wikipedia/commons/9/9e/LG_Electronics_logo.svg'],
            ['name' => 'Bosch',     'logo' => 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Bosch_logo.svg'],
            ['name' => 'Philips',   'logo' => 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Philips_logo.svg'],
            ['name' => 'Nike',      'logo' => 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg'],
            ['name' => 'Adidas',    'logo' => 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg'],
            ['name' => 'Dell',      'logo' => 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg'],
        ];
        foreach ($brands as $brand) {
            \App\Models\Brand::factory()
                ->withRealisticData($brand['name'], $brand['logo'])
                ->create();
        }
    }
}
