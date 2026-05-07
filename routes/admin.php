<?php

use App\Http\Controllers\Admin\{
    DashboardController,
    PageController,
    UserController,
    TranslationController,
    ShippingController,
    PaymentMethodController
};
use App\Http\Controllers\Admin\Commerce\{
    CategoryController,
    ItemController,
    ManufacturerController,
    OrderController
};
use Illuminate\Support\Facades\Route;

// Dashboard
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Settings Group
Route::prefix('settings')->name('settings.')->group(function () {

    // General Settings
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/', 'settings')->name('index');
        Route::post('/', 'update')->name('update');
    });

    // Translations
    Route::controller(TranslationController::class)->prefix('translations')->name('translations.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/update', 'update')->name('update');
        Route::post('/scan', 'scan')->name('scan');
        Route::post('/update-all', 'updateAll')->name('update-all');
    });

    // Shipping Methods
    Route::resource('shippings', ShippingController::class)->only(['index', 'edit', 'update']);
    Route::patch('shippings/{shipping}/toggle', [ShippingController::class, 'toggle'])->name('shippings.toggle');

    // Payment Methods (Перенесено сюди для логіки)
    Route::resource('payment-methods', PaymentMethodController::class);
});

// Core Resources
Route::resources([
    'users' => UserController::class,
    'pages' => PageController::class,
]);

// Commerce Group
Route::prefix('commerce')->name('commerce.')->group(function () {
    Route::resources([
        'manufacturers' => ManufacturerController::class,
        'categories'    => CategoryController::class,
        'items'         => ItemController::class,
        'orders'        => OrderController::class,
    ]);
});
