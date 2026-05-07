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
use App\Http\Controllers\Admin\Settings\AppVersionController;
use Illuminate\Support\Facades\Route;

// Dashboard
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Settings Group
Route::prefix('settings')->name('settings.')->group(function () {
    // 1. Roadmap & Versions (Виділяємо в окремий під-префікс)
    Route::prefix('versions')->name('versions.')->group(function () {
        Route::get('/', [AppVersionController::class, 'index'])->name('index');
        Route::post('/', [AppVersionController::class, 'store'])->name('store');
        Route::put('/{appVersion}', [AppVersionController::class, 'update'])->name('update');
        Route::delete('/{appVersion}', [AppVersionController::class, 'destroy'])->name('destroy');

        // Керування завданнями (Items) всередині версій
        Route::post('/{app_version}/items', [AppVersionController::class, 'addItem'])->name('items.store');
        Route::prefix('items/{item}')->group(function () {
            Route::patch('/toggle', [AppVersionController::class, 'toggleItem'])->name('items.toggle');
            Route::put('/', [AppVersionController::class, 'updateItem'])->name('items.update');
            Route::patch('/move', [AppVersionController::class, 'moveItem'])->name('items.move');
            Route::delete('/', [AppVersionController::class, 'deleteItem'])->name('items.destroy');
        });
    });
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
