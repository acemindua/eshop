<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained()->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('menu_items')->onDelete('cascade');

            // Поліморфний зв'язок: додає model_id та model_type
            // Це дозволить прив'язати Page або Category
            $table->nullableMorphs('model');

            // Кастомні дані, якщо модель не вибрана
            $table->json('label')->nullable();
            $table->string('url')->nullable();   // Кастомний URL (якщо не зі сторінки)

            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
