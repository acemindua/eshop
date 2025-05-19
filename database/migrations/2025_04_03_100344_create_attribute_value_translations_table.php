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
        Schema::create('attribute_value_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('attribute_value_id');
            $table->string('locale')->index();

            $table->string('title'); // Наприклад, "25кг (мішок)" або "Red"
            $table->string('slug');
            $table->string('description')->nullable();

            $table->timestamps();

            $table->unique(['attribute_value_id', 'locale']);
            $table->foreign('attribute_value_id')->references('id')->on('attribute_values')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('attribute_value_translations');
    }
};
