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
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->string('alias')->unique(); // 'nova_poshta', 'ukr_poshta', 'pickup'
            $table->string('name'); // Назва для відображення
            // Якщо ви не хочете зберігати реквізити в JSON, можна окремим полем:
            $table->text('payment_details')->nullable();
            $table->boolean('is_active')->default(false);
            $table->json('settings')->nullable(); // API ключі, націнки, ліміти
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shippings');
    }
};
