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
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();

            // Унікальний ідентифікатор для логіки (nova_poshta, pickup, ukr_poshta)
            $table->string('alias')->unique();

            // Назва, яку бачить клієнт (н-р: "Самовивіз", "Нова Пошта")
            $table->string('name');

            // Короткий опис (н-р: "Доставка у відділення", "Безкоштовно з нашого складу")
            $table->string('description')->nullable();

            // Ціна доставки (якщо вона фіксована)
            $table->decimal('price', 10, 2)->default(0);

            // Чи активний метод зараз
            $table->boolean('is_active')->default(true);

            // JSON для налаштувань: API ключі, іконки, специфічні ліміти ваги тощо
            $table->json('settings')->nullable();

            // Порядок сортування в списку на чекауті
            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });

        // Permission
        $modelName = 'shipping';
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
        Schema::dropIfExists('shippings');
    }
};
