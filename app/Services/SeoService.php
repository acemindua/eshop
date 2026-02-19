<?php

namespace App\Services;

use App\Facades\Settings;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class SeoService
{
    public function generate($manualModel = null): array
    {


        // 1. Якщо модель передана вручну в контролері
        $model = $manualModel;



        // 2. Якщо не передана — шукаємо в параметрах поточного роуту
        if (!$model) {
            $model = collect(Route::current()?->parameters())->first(function ($param) {
                return $param instanceof Model;
            });
        }



        // ВАЖЛИВО: Отримуємо налаштування всередині сервісу
        $settings = Settings::all();

        $title = '';
        $description = '';
        if ($model instanceof \Illuminate\Support\Collection) {
            $title = $model->get('title');
            $description = $model->get('site_tagline');
        } elseif (is_object($model)) {
            $title = $model->title ?? '';
            $description = $model->description ?? '';
        } elseif (is_array($model)) {
            $title = $model['title'] ?? '';
            $description = $model['description'] ?? '';
        }
        $seo = [
            'title'         => $title ?: ($settings['site_name'] ?? config('app.name')),
            'description'   => $description ?: ($settings['site_tagline'] ?? ""),
            'robots'      => 'index, follow', // За замовчуванням
            'canonical'   => request()->url(),
            'twitter_site'    => '@your_brand_handle', // Назва вашого акаунту
            'twitter_creator' => '@your_brand_handle',
            'twitter_card'    => 'summary_large_image', // Режим великого прев'ю
        ];

        if ($model && method_exists($model, 'getSeoMetadata')) {
            $seo = array_merge($seo, $model->getSeoMetadata());
        }

        // ЛОГІКА ДЛЯ РОБОТІВ:
        // Якщо це сторінка пошуку або сторінка з пагінацією (опціонально)
        if (request()->routeIs('search') || request()->has('page')) {
            $seo['robots'] = 'noindex, follow';
        }
        $locales = LaravelLocalization::getSupportedLanguagesKeys();

        foreach ($locales as $locale) {
            if ($model && is_object($model) && method_exists($model, 'getTranslation')) {
                // Логіка для товарів/категорій зі своїми слагами
                $translation = $model->translate($locale);
                if ($translation && isset($translation->slug)) {
                    // Отримуємо URL для конкретного перекладу моделі
                    $hreflangs[$locale] = LaravelLocalization::getLocalizedURL($locale, $translation->slug);
                }
            } else {
                // Для статичних сторінок (Головна, Кошик тощо)
                // Цей метод автоматично візьме поточний URL і замінить мовний префікс
                $hreflangs[$locale] = LaravelLocalization::getLocalizedURL($locale, null, [], true);
            }
        }

        $seo['hreflangs'] = $hreflangs;

        return $seo;
    }

    public function generateSchema($model = null): array
    {
        $schemas = [];

        // 1. WebSite & SearchAction (для головної)
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'url' => config('app.url'),
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => config('app.url') . '/search?q={search_term_string}',
                'query-input' => 'required name=search_term_string',
            ],
        ];

        // 2. BreadcrumbList
        if ($model) {
            $schemas[] = [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => [
                    ['@type' => 'ListItem', 'position' => 1, 'name' => 'Головна', 'item' => url('/')],
                    ['@type' => 'ListItem', 'position' => 2, 'name' => $model->title ?? 'Товар', 'item' => request()->url()],
                ],
            ];
        }

        return $schemas;
    }
}
