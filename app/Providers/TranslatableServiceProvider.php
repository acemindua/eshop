<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class TranslatableServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void {}

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (Schema::hasTable('languages')) {
            $localesKey = (new \App\Services\LanguageServices())->getActiveLanguageKeys();
            config()->set('translatable.locales', $localesKey);
        }
    }
}
