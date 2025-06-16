<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

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
                'user' => $request->user() ? [
                    'name'          => $request->user()->name,
                    'surname'       => $request->user()->surname,
                    'full_name'     => $request->user()->full_name,
                    'email'         => $request->user()->email,
                    'phone'         => $request->user()->phone,
                    'avatar'        => $request->user()->avatar,
                    'id'            => $request->user()->id,
                ] : null,
            ],
            'app' => [
                'name'              => config('app.name', 'Laravel'),
                'year'              => config('app.year', date('Y')),
                'env'               => config('app.env', 'local'),
                'version'           => config('app.version', '1.0.0'),
                'laravelVersion'    => \Illuminate\Foundation\Application::VERSION,
                'phpVersion'        => PHP_VERSION
            ],
            'lang' => [
                'locale'        => app()->getLocale(),
                'default'       => app()->getLocale(),
                'keys'          => config('translatable.locales'),
                'locales'       => (new \App\Services\LanguageServices())->getActiveLanguages(),
                'mapping'       => config('laravellocalization.localesMapping', [])
            ],
            'permissions' => json_decode(Auth::user()?->jsPermissions() ?? '{}', true),
            'flash' => [
                'alert' => $request->session()->get('alert'),
            ],
        ];
    }
}
