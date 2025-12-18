<?php

namespace App\Http\Middleware;

use App\Facades\Settings;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
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
                'name'          => Settings::get('site_name') ?: config('app.name'),
                'version'       => config('app.version'),
                'mode'          => config('app.env')
            ],
            'settings'      => fn() => Settings::all(),
            'alert'         => fn() => $request->session()->get('alert'),
            'flash'         => [
                'message'   => fn() => $request->session()->get('message'),
            ],
        ];
    }
}
