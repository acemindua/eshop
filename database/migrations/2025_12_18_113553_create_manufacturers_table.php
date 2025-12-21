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
        Schema::create('manufacturers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('country', 2)->nullable();
            $table->boolean('public')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Permission
        $modelName = 'manufacturer';
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
        Schema::dropIfExists('manufacturers');
    }
};
