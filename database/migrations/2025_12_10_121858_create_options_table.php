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
        Schema::create('options', function (Blueprint $table) {
            $table->id();

            // Ключ налаштування (наприклад, 'site_name', 'admin_email')
            $table->string('key')->unique();

            // Значення налаштування. Використовуйте longText, якщо значення може бути великим 
            // (наприклад, JSON-об'єкт або великий текст)
            $table->longText('value')->nullable();

            // Додаткове поле для опису (корисно для адмін-панелі)
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('options');
    }
};
