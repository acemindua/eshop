<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class LocalesServiceProvider extends ServiceProvider
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
            if ($localesKey) {
                config()->set('translatable.locales', $localesKey);
            } else {
                $getSupportedLocales =  (new \App\Services\LanguageServices())->getAllLanguages();
                foreach ($getSupportedLocales as $locale) {
                    (new \App\Services\LanguageServices())->createActiveLanguages(app()->getLocale());
                }
                $localesKey = (new \App\Services\LanguageServices())->getActiveLanguageKeys();
                config()->set('translatable.locales', $localesKey);
            }
        }
    }
}
