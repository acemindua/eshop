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
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');

            $table->string('slug')->unique();

            $table->integer('category_id')->unsigned();

            $table->string('sku')->nullable()->unique()->comment('Stock Keeping Unit - unique identifier');

            $table->decimal('price', 8, 2);
            $table->integer('quantity')->default(0);

            $table->boolean('public')->default(false);
            $table->integer('order')->default(1);
            $table->integer('user_id')->unsigned();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('products');
    }
};
