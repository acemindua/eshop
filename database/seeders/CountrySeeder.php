<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Rinvex\Country\CountryLoader;

class CountrySeeder extends Seeder
{
    public function run()
    {
        $countries = CountryLoader::countries();
        foreach ($countries as $country) {
            DB::table('countries')->insert([
                'name' => $country['name'] ?? null,
                'code' => $country['iso_3166_1_alpha2'] ?? null,
                'phone_code' => '+' . ($country['calling_code'][0] ?? null),
                'language_code' => $country['iso_3166_1_alpha3'] ?? null,
            ]);
        }
    }
}
