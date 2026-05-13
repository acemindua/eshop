<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $warehouses = [
            [
                'title'         => 'Головний склад (Київ)',
                'city'          => 'Київ',
                'address'       => 'вул. Степана Бандери, 21',
                'map_link'      => 'https://maps.google.com/?q=Київ,Бандери,21',
                'working_hours' => 'Пн-Пт: 09:00 - 20:00, Сб: 10:00 - 18:00',
                'phone'         => '+380441234567',
                'sort_order'    => 1,
                'is_active'     => true,
            ],
            [
                'title'         => 'Склад Львів (Південний)',
                'city'          => 'Львів',
                'address'       => 'вул. Щирецька, 36',
                'map_link'      => 'https://maps.google.com/?q=Львів,Щирецька,36',
                'working_hours' => 'Пн-Сб: 10:00 - 19:00',
                'phone'         => '+380322223344',
                'sort_order'    => 2,
                'is_active'     => true,
            ],
            [
                'title'         => 'Точка видачі Одеса',
                'city'          => 'Одеса',
                'address'       => 'вул. Дерибасівська, 1',
                'map_link'      => 'https://maps.google.com/?q=Одеса,Дерибасівська,1',
                'working_hours' => 'Щодня: 10:00 - 21:00',
                'phone'         => '+380487776655',
                'sort_order'    => 3,
                'is_active'     => true,
            ],
            [
                'title'         => 'Резервний склад (Тимчасово закрито)',
                'city'          => 'Харків',
                'address'       => 'вул. Сумська, 10',
                'map_link'      => null,
                'working_hours' => null,
                'phone'         => null,
                'sort_order'    => 10,
                'is_active'     => false,
            ],
        ];

        foreach ($warehouses as $warehouse) {
            Warehouse::updateOrCreate(
                ['title' => $warehouse['title']], // Унікальність за назвою
                $warehouse
            );
        }
    }
}