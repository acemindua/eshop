<?php

namespace App\Providers;

use App\Services\SharedDataService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class SettingsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

        if (Schema::hasTable('settings')) {
            $settings = \App\Models\Setting::all()->pluck('value', 'key')->toArray();
            config()->set('settings', $settings);
        }

        if (Schema::hasTable('categories') && Schema::hasTable('pages')) {
            Inertia::share([
                'responseData' => fn() => [
                    'categories'    => SharedDataService::getCategories(),
                    'pages'         => SharedDataService::getPages(),
                ],
            ]);
        }
    }
}
