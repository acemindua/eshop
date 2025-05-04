<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateSuperUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name'      => 'Super User',
            'phone'     => '0982925252',
            'email'     => 'acemind.ua@gmail.com',
            'password'  => Hash::make('admin@admin'),
            'email_verified_at' => now(),
        ]);

        $user->assignRole('super-user');
    }
}
