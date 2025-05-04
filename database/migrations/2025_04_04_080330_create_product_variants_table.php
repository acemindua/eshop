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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('product_id');
            $table->unsignedInteger('attribute_id');
            $table->unsignedInteger('attribute_value_id');

            $table->string('slug')->unique()->nullable();
            $table->unsignedInteger('order')->default(1);
            $table->boolean('public')->default(false);

            $table->timestamps();
            $table->softDeletes();

            // Вказуємо коротку назву для унікального індексу
            $table->unique(['product_id', 'attribute_id', 'attribute_value_id'], 'prod_attr_val_unique');

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade');
            $table->foreign('attribute_value_id')->references('id')->on('attribute_values')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('product_variants');
    }
};
