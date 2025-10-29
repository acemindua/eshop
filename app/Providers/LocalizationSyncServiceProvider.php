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

            // Якщо існує регіональний код (наприклад, 'en_GB')
            if (! empty($localeData['regional'])) {

                // Розділяємо на код мови ('en') та код країни ('GB')
                // Використовуємо регіональний код, який має вигляд 'lang_COUNTRY'
                $regionalCode = $localeData['regional'];

                // Розділяємо за символом '_' (підкреслення)
                if (str_contains($regionalCode, '_')) {
                    [$langCode, $countryCode] = explode('_', $regionalCode, 2);

                    // Код країни завжди у верхньому регістрі (наприклад, 'GB', 'UA')
                    $countryCode = strtoupper($countryCode);

                    if (! empty($countryCode)) {
                        // Якщо ключ мови ('en', 'es') ще не існує, створюємо масив
                        if (! isset($translatableLocales[$langCode])) {
                            $translatableLocales[$langCode] = [];
                        }

                        // Додаємо код країни до масиву
                        $translatableLocales[$langCode][] = $countryCode;
                    }
                }
            } else {
                // Якщо регіональний код порожній, додаємо простий код мови ('ace')
                // Це також важливо для коректної роботи array_unique
                $translatableLocales[] = $localeKey;
            }
        }

        // Очищаємо дублікати країн у кожній мові (хоча це малоймовірно)
        foreach ($translatableLocales as $key => $value) {
            if (is_array($value)) {
                $translatableLocales[$key] = array_unique($value);
            }
        }

        // 3. Перевизначити конфігурацію 'translatable.locales' під час завантаження
        Config::set('translatable.locales', $translatableLocales);

        // 💡 Додатково: Встановлення Fallback Locale
        // Якщо ви використовуєте 'en' як fallback, встановіть його повний регіональний код,
        // якщо він є активним і вимагається пакетом translatable.
        /*
        $defaultLocaleKey = config('app.fallback_locale', 'en');
        if (isset($supportedLocales[$defaultLocaleKey]['regional'])) {
            $fullFallback = str_replace('_', '-', $supportedLocales[$defaultLocaleKey]['regional']);
            Config::set('translatable.fallback_locale', $fullFallback);
        }
        */
    }
}
