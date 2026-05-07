<?php

namespace App\Http\Middleware;

use App\Facades\Settings;
use App\Http\Resources\UserResource;
use App\Models\AppVersion;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' =>  $request->user() ?
                    new UserResource($request->user()) : null
            ],
            'config' => [
                'locale'            => config('app.locale') ?: 'en',
                'locales'           => config('translatable.locales') ?: [],
                'supportedLocales'  => LaravelLocalization::getSupportedLocales(),
                'localesMapping'    => config('laravellocalization.localesMapping') ?: [],
                'currentLocale'     => app()->getLocale() ?: 'en'
            ],
            'app' => [
                'url'           => config('app.url'),
                'name'          => Settings::get('site_name') ?: config('app.name'),
                'version'       => fn() => $this->getAppVersion(),
                'mode'          => config('app.env')
            ],
            'cart' => [
                // Додаємо ->values(), щоб отримати чистий масив товарів для Vue
                'items' => Cart::getContent()->values()->toArray(),
                'total' => Cart::getTotal(),
                'count' => Cart::getTotalQuantity(),
            ],
            'settings'      => fn() => Settings::all(),
            'alert'         => fn() => $request->session()->get('alert'),
            'flash'         => [
                'message'   => fn() => $request->session()->get('message'),
            ],
        ];
    }

    /**
     * Отримує актуальну версію з БД або конфігу
     */
    protected function getAppVersion(): string
    {
        // 1. Перевіряємо, чи є таблиця в БД (захист від помилок під час міграцій)
        if (Schema::hasTable('app_versions')) {
            // 2. Беремо останню за датою або версією
            $latest = AppVersion::orderBy('version', 'desc')->first();

            if ($latest) {
                return $latest->version;
            }
        }

        // 3. Фолбек на значення з config/app.php
        return config('app.version', '1.0.0');
    }
}
