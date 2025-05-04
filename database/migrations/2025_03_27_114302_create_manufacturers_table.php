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
            $table->increments('id');
            $table->boolean('public')->default(false);
            $table->integer('order')->default(1);
            $table->integer('user_id')->unsigned();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        $modelName = 'manufacturer'; // Тут можна змінити
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
        Schema::dropIfExists('manufacturers');
    }
};
