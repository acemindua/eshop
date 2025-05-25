<?php

namespace App\Services;

use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use App\Models\Language;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Cache;


class LanguageServices
{
    /**
     * Отримує всі доступні мови.
     *
     * @return array
     */
    public function getAllLanguages(): array
    {
        $langs = [];

        $locales = LaravelLocalization::getSupportedLocales();
        foreach ($locales as $code => $description) {
            $langs[$code] = [
                'name'      => $description['name'] ?? 'Unknown',
                'native'    => $description['native'] ?? 'Unknown',
                'regional'  => $description['regional'] ?? 'Unknown',
            ];
        }

        return $langs;
    }

    /**
     * Створює записи нових активних мов у базі даних.
     */
    public function createActiveLanguages(string $locale): void
    {
        $locales = LaravelLocalization::getSupportedLocales();

        foreach ($locales as $code => $description) {
            if (!Language::where('code', $code)->exists()) {
                Language::create([
                    'code'          => $code,
                    'description'   => json_encode($description),
                    'order'         => Language::count() + 1,
                    'public'        => $code == $locale  ? true : false
                ]);
            }
        }
    }

    /**
     * Витягує з бази даних тільки активні мови.
     *
     * @return array
     */
    public function getActiveLanguages(): array
    {
        $langs = [];
        $active_langs = Language::where('public', true)->get();

        foreach ($active_langs as $lang) {
            $decodedDescription = json_decode($lang->description, true);

            if (isset($decodedDescription['name'], $decodedDescription['native'], $decodedDescription['regional'])) {
                $regionCode = isset($decodedDescription['regional']) ? explode('_', $decodedDescription['regional'])[1] ?? null : null;

                $langs[$lang->code] = [
                    'name'      => $decodedDescription['name'] ?? 'Unknown',
                    'native'    => $decodedDescription['native'] ?? 'Unknown',
                    'regional'  => $decodedDescription['regional'] ?? 'Unknown',
                    'flag'      => $regionCode ? strtolower($regionCode) : 'unknown',
                ];
            }
        }

        return $langs;
    }


    /**
     * Витягує "ключі" доступних мов.
     *
     * @return array
     */
    public function getActiveLanguageKeys(): array
    {
        return Language::where('public', true)->pluck('code')->toArray();
    }
}
