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
        // 1. Таблиця версій
        Schema::create('app_versions', function (Blueprint $table) {
            $table->id();
            $table->string('version')->unique();
            // ДОДАЄМО статус, щоб контролер міг його оновлювати
            $table->string('status')->default('active');
            $table->date('released_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Таблиця пунктів (чекліст)
        Schema::create('app_version_items', function (Blueprint $table) {
            $table->id();
            // ЗМІНЮЄМО на app_version_id, щоб Laravel автоматично розумів зв'язок
            $table->foreignId('app_version_id')->constrained('app_versions')->onDelete('cascade');
            $table->string('content');
            $table->enum('type', ['feature', 'fix', 'improvement', 'other'])->default('feature');
            $table->enum('category', ['changelog', 'roadmap'])->default('roadmap');
            $table->boolean('is_completed')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Permissions
        $modelName = 'app_version';
        $actions = ['view', 'create', 'update', 'delete'];

        foreach ($actions as $action) {
            Permission::firstOrCreate([
                'name' => "{$modelName}-{$action}",
                'guard_name' => 'web'
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Вимикаємо перевірку ключів для безпечного видалення
        Schema::disableForeignKeyConstraints();

        // Видаляємо обидві таблиці
        Schema::dropIfExists('app_version_items');
        Schema::dropIfExists('app_versions');

        Schema::enableForeignKeyConstraints();
    }
};
