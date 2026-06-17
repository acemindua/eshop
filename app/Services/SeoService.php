<?php

namespace App\Services;

use App\Facades\Settings;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Illuminate\Support\Str;
use Throwable;

class SeoService
{
    /**
     * SEO generator
     */
    public function generate(?Model $model = null): array
    {
        try {
            $host = request()->getHost();
            $appHost = parse_url(config('app.url') ?? '', PHP_URL_HOST);

            // Admin noindex protection
            if ($appHost && $host === 'app.' . $appHost) {
                return [
                    'meta' => [
                        'robots' => 'noindex, nofollow',
                    ],
                    'links' => [],
                ];
            }

            // Auto-resolve model from route
            if (!$model) {
                $model = collect(Route::current()?->parameters() ?? [])
                    ->first(fn($p) => $p instanceof Model);
            }

            return [
                'meta'  => $this->generateMeta($model),
                'links' => $this->generateLinks($model),
            ];
        } catch (Throwable $e) {
            report($e);

            return [
                'meta' => [
                    'title' => config('app.name'),
                    'description' => '',
                    'robots' => 'index, follow',
                ],
                'links' => [],
            ];
        }
    }

    /**
     * Meta tags
     */
    public function generateMeta(?Model $model): array
    {
        $siteName = $this->settings('site_name') ?: config('app.name');

        $title = $siteName;
        $description = $this->settings('site_tagline') ?: '';
        $image = 'https://placehold.co/1200x630?text=' . urlencode($siteName);

        try {
            if ($model && method_exists($model, 'translate')) {
                $t = $model->translate();

                if ($t) {
                    $title = ($t->title ?? $title) . ' | ' . $siteName;

                    $rawText = $t->content ?? $t->description ?? '';
                    $description = $t->meta_description
                        ?: Str::limit(strip_tags($rawText), 155);

                    if (method_exists($model, 'getFirstMediaUrl')) {
                        $image = $model->getFirstMediaUrl('images') ?: $image;
                    }
                }
            }
        } catch (Throwable $e) {
            report($e);
        }

        return [
            'title' => $title,
            'description' => $description,

            'ogTitle' => $title,
            'ogDescription' => $description,
            'ogImage' => $image,
            'ogUrl' => request()->url() ?? '',
            'ogType' => 'website',
            'ogSiteName' => $siteName,

            'robots' => 'index, follow',

            // Twitter
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $title,
            'twitterDescription' => $description,
            'twitterImage' => $image,
            'twitterSite' => '@YourTwitterHandle',
            'twitterCreator' => '@AuthorHandle',
        ];
    }

    /**
     * Canonical + hreflang
     */
    public function generateLinks(?Model $model): array
    {
        try {
            $canonical = LaravelLocalization::getNonLocalizedURL();
            $hreflangs = [];

            // Canonical with model
            if ($model && method_exists($model, 'translate')) {
                $translation = $model->translate();

                if ($translation?->slug) {
                    $canonical = LaravelLocalization::getLocalizedURL(
                        app()->getLocale(),
                        $translation->slug
                    );
                }
            }

            foreach (LaravelLocalization::getSupportedLanguagesKeys() as $locale) {
                $slug = null;

                if ($model && method_exists($model, 'translate')) {
                    $slug = $model->translate($locale)?->slug ?? null;
                }

                $hreflangs[$locale] = LaravelLocalization::getLocalizedURL(
                    $locale,
                    $slug,
                    [],
                    true
                );
            }

            return [
                'canonical' => $canonical,
                'hreflangs' => $hreflangs,
            ];
        } catch (Throwable $e) {
            report($e);

            return [
                'canonical' => request()->url() ?? '',
                'hreflangs' => [],
            ];
        }
    }

    /**
     * Safe settings getter (cached-friendly)
     */
    protected function settings(?string $key = null): string
    {
        try {
            $all = Settings::all();

            if (!is_array($all)) {
                return '';
            }

            return $all[$key] ?? '';
        } catch (Throwable $e) {
            report($e);
            return '';
        }
    }
}
