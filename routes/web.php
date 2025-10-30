<?php

use App\Http\Controllers\LocaleSwitcherController;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/**
 * Admin
 */
Route::group(['middleware' => ['auth', 'verified', 'role:super-user|administrator|moder|user']], function () {
    Route::domain('app.' . parse_url(config('app.url'), PHP_URL_HOST))->name('admin.')->group(base_path('routes/admin.php'));
});

Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ],
    function () {

        //
        Route::domain(parse_url(config('app.url'), PHP_URL_HOST))->group(base_path('routes/public.php'));
        //
        require __DIR__ . '/auth.php';
    }
);

Route::get('/locale/{locale}', [LocaleSwitcherController::class, 'change'])->name('locale.switcher');
