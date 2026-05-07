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
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();

            // Системний код (напр. 'monobank', 'liqpay')
            $table->string('code')->unique();

            // Повний шлях до класу драйвера 
            // Напр. 'App\Services\Payments\Drivers\MonoDriver'
            $table->string('driver');

            // JSON поле для всіх технічних налаштувань (API токени, ключі)
            $table->json('settings')->nullable();

            // Поля для Ace Admin UI
            $table->string('icon')->nullable()->default('IconCreditCard');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });

        // Permission
        $modelName = 'payment-methods';
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
        Schema::dropIfExists('payment_methods');
    }
};
