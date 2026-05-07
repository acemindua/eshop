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
        Schema::create('payment_method_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_method_id')->constrained()->onDelete('cascade');
            $table->string('locale')->index();

            $table->string('title'); // Назва: "Оплата за реквізитами", "LiqPay"
            $table->text('description')->nullable(); // Опис для клієнта
            $table->text('instructions')->nullable(); // Інструкції (наприклад, номер карти)

            $table->unique(['payment_method_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_method_translations');
    }
};
