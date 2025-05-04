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
        Schema::create('manufacturer_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('manufacturer_id')->unsigned();
            $table->string('locale')->index();

            $table->string('title');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->text('content')->nullable();

            $table->timestamps();
            $table->unique(['slug', 'locale']);
            $table->unique(['manufacturer_id', 'locale']);
            $table->foreign('manufacturer_id')->references('id')->on('manufacturers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('manufacturer_translations');
    }
};
