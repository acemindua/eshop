<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\RoomsController;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

Route::group(['middleware' => ['auth', 'verified', 'role:super-user|admin|moder|auth']], function () {
    Route::domain('app.' . parse_url(config('app.url'), PHP_URL_HOST))->name('admin.')->group(base_path('routes/app.php'));
});

Route::middleware(['web'])->group(
    function () {
        //
        Route::get('/language/{locale}', [LanguageController::class, 'change'])->name('lang.swicher');

        Route::prefix('cart')->controller(CartController::class)->group(function () {
            Route::get('/', 'index')->name('cart.index');
            Route::post('/', 'store')->name('cart.store');
            // Оновлення кількості для конкретного елемента кошика
            Route::put('/{cartItemId}', 'update')->name('cart.update');
            // Видалення конкретного елемента з кошика
            Route::delete('/{cartItemId}', 'remove')->name('cart.remove');
            // Очищення всього кошика
            Route::post('/clear', 'clear')->name('cart.clear'); // Або Route::delete('/clear', 'clear')
        });
        // Route to redirect to Google's OAuth page
        Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
        // Route to handle the callback from Google
        Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
    }
);

Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ],
    function () {

        Route::domain(parse_url(config('app.url'), PHP_URL_HOST))->group(base_path('routes/main.php'));

        require __DIR__ . '/auth.php';
    }
);

Route::get('/rooms', [RoomsController::class, 'index'])->name('rooms.index');
Route::get('/rooms/{room}', [RoomsController::class, 'show'])->name('rooms.show');
Route::post('/rooms/{roomId}/message', [ChatController::class, 'postMessage'])->name('api.rooms.message.post');
