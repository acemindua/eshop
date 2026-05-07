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
            // Контактні дані та ПІБ
            $table->string('last_name')->nullable()->after('name');
            $table->string('middle_name')->nullable()->after('last_name');
            $table->string('phone')->nullable()->unique()->after('email');

            // Персоналізація та Маркетинг
            $table->date('birthday')->nullable()->after('phone');
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('birthday');
            $table->boolean('newsletter_accepted')->default(false)->after('gender');

            // Лояльність та Налаштування
            $table->decimal('bonus_balance', 10, 2)->default(0)->after('newsletter_accepted');
            $table->string('preferred_locale', 5)->default('uk')->after('bonus_balance');

            // Логістичні преференції (для автозаповнення Checkout)
            $table->string('default_city_ref')->nullable()->after('preferred_locale');
            $table->string('default_warehouse_ref')->nullable()->after('default_city_ref');

            // Соціальний вхід (Socialite)
            $table->string('provider')->nullable()->after('password');
            $table->string('provider_id')->nullable()->after('provider');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'last_name',
                'middle_name',
                'phone',
                'birthday',
                'gender',
                'newsletter_accepted',
                'bonus_balance',
                'preferred_locale',
                'default_city_ref',
                'default_warehouse_ref',
                'provider',
                'provider_id'
            ]);
        });
    }
};
