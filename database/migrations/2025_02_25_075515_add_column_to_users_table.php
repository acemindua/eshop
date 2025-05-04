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
        Schema::table('users', function (Blueprint $table) {
            $table->increments('id')->change();
            $table->string('surname', 50)->nullable()->after('name');
            $table->string('phone', 20)->nullable()->after('surname')->unique();
            $table->longText('description')->nullable()->after('phone');
            $table->timestamp('last_seen')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['surname', 'phone', 'description', 'last_seen']);
            $table->dropSoftDeletes();
        });
    }
};
