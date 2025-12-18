<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;

class LocalizationSyncServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Немає нічого для реєстрації, оскільки ми змінюємо конфігурацію в методі boot.
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Перевірка, чи завантажено обидва конфігураційні файли
        if (! Config::has('laravellocalization.supportedLocales') || ! Config::has('translatable')) {
            // Можливо, один із пакетів не встановлено або конфігурація не опублікована.
            // Ми ігноруємо, щоб уникнути помилок, якщо додаток запускається в режимі тестування тощо.
            return;
        }

        // 1. Отримати список усіх підтримуваних локалей з laravel-localization
        $supportedLocales = config('laravellocalization.supportedLocales');

        // 2. Сформувати новий масив у форматі, необхідному для translatable.locales
        $translatableLocales = [];

        foreach ($supportedLocales as $localeKey => $localeData) {

            $translatableLocales[] = $localeKey;
        }

        Config::set('translatable.locales', $translatableLocales);
    }
}
