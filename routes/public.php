<?php

use App\Http\Controllers\Public\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Public\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('account')->group(function () {
    Route::controller(AccountController::class)->group(function () {
        // Головна сторінка кабінету
        Route::get('/', 'index')->name('account');

        // Редагування профілю (текстові дані)
        // Використовуємо PATCH, бо ми оновлюємо існуючі поля
        Route::patch('/profile', 'update')->name('profile.update');

        // Окремий маршрут для аватара
        // Використовуємо POST, бо завантаження файлів через Inertia 
        // найкраще працює з POST + _method: PATCH у формі
        Route::post('/profile/avatar', 'updateAvatar')->name('profile.avatar.update');
    });
});

// КОШИК ТА ОФОРМЛЕННЯ (Cart & Checkout)
Route::controller(CartController::class)->group(function () {
    // Сторінка кошика (редагування)
    Route::get('/cart', 'index')->name('cart.index');

    // Оновлення кількості та видалення (для Vue-компонентів)
    Route::patch('/cart/{id}', 'update')->name('cart.update');
    Route::delete('/cart/{id}', 'destroy')->name('cart.destroy');

    // Сторінка оформлення замовлення (введення даних)
    Route::get('/checkout', 'checkout')->name('checkout');

    // Збереження замовлення
    Route::post('/order', 'store')->name('order.store');
});

// ГОЛОВНА ТА ДИНАМІЧНІ СТОРІНКИ
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/search', 'search')->name('search');
    Route::get('/category__{category:slug}', 'categoryShow')->name('category.show');
    Route::get('/brand__{brand:slug}', 'brandShow')->name('brand.show');

    // Динамічний роут має бути останнім, щоб не перехоплювати фіксовані адреси
    Route::get('/{slug}/{optional?}', 'resolveDynamicRoute')
        ->where('slug', '[a-z0-9-]+')
        ->name('page.show');
});
