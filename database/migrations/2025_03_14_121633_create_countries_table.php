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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);          // Назва країни
            $table->string('code', 2)->unique();  // Код країни (ISO 3166-1 alpha-2)
            $table->string('phone_code', 10);     // Телефонний код (+380)
            $table->string('language_code', 10);  // Код мови (uk_UA)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
