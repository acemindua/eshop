<?php

namespace App\Providers;

use App\Services\SettingsManager;
use Illuminate\Support\ServiceProvider;

class SettingsServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Прив'язуємо singleton-екземпляр SettingsManager до Service Container 
        // під ключем 'settings.manager'
        $this->app->singleton('settings.manager', function ($app) {
            return new SettingsManager();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
