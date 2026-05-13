<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();

            // Основна інформація
            $table->string('title');
            $table->string('city');
            $table->string('address');

            // Контакти та логістика
            $table->string('map_link')->nullable();
            $table->string('working_hours')->nullable();
            $table->string('phone')->nullable();

            // Статус та сортування
            $table->integer('sort_order')->default(0); // Додано для синхронізації з моделлю
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });

        // Permission
        $modelName = 'warehouse';
        $permissions = ['view', 'create', 'update', 'delete'];

        foreach ($permissions as $action) {
            $permissionName = "{$modelName}-{$action}";
            if (!Permission::where('name', $permissionName)->exists()) {
                Permission::create(['name' => $permissionName, 'guard_name' => 'web']);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('warehouses');
    }
};
