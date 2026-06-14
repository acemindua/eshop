<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Commerce\{ItemController, CategoryController};
use App\Http\Controllers\Admin\Core\{
    PageController,
    UserController,
    // Menu Management, Navigation Structures & Dynamic Link Collections
    MenuController,
};
use App\Http\Controllers\Admin\Settings\{
    AppVersionController,
    TranslationController
};
use App\Http\Controllers\Admin\Commerce\Settings\{
    WarehouseController,
    ShippingController,
    PaymentMethodController
};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Panel Routes Matrix
|--------------------------------------------------------------------------
*/

// Main Dashboard Initialization Matrix Node
Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

// Core Infrastructure System Resource Controllers
Route::resources([
    'users' => UserController::class,
    'pages' => PageController::class,
    'menus' => MenuController::class,
]);

Route::prefix('commerce')->name('commerce.')->group(function () {
    Route::resources([
        'categories'    => CategoryController::class,
        'items'         => ItemController::class,
        //'manufacturers' => ManufacturerController::class,
        //'orders'        => OrderController::class,
    ]);
});


// Global System Configuration and Utility Boundaries Area
Route::prefix('settings')->name('settings.')->group(function () {

    // Global Site Options & Key-Value Configuration Registry
    Route::get('/', [AdminController::class, 'options'])->name('options');
    Route::post('/', [AdminController::class, 'update'])->name('update');

    // System Localization & Dynamic Translation Dictionary Operations
    Route::controller(TranslationController::class)->prefix('translations')->name('translations.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/sync', 'sync')->name('sync');
        Route::post('/update-all', 'updateAll')->name('update-all');
    });

    // Roadmap Planning, Sprint Version Releases & Project Backlog Nodes
    Route::prefix('versions')->name('versions.')->group(function () {
        Route::get('/', [AppVersionController::class, 'index'])->name('index');
        Route::post('/', [AppVersionController::class, 'store'])->name('store');
        Route::put('/{appVersion}', [AppVersionController::class, 'update'])->name('update');
        Route::delete('/{appVersion}', [AppVersionController::class, 'destroy'])->name('destroy');

        // Embedded Task Issues Management System Context inside Milestones
        Route::post('/{app_version}/items', [AppVersionController::class, 'addItem'])->name('items.store');

        Route::prefix('items/{item}')->group(function () {
            Route::patch('/toggle', [AppVersionController::class, 'toggleItem'])->name('items.toggle');
            Route::put('/', [AppVersionController::class, 'updateItem'])->name('items.update');
            Route::patch('/move', [AppVersionController::class, 'moveItem'])->name('items.move');
            Route::delete('/', [AppVersionController::class, 'deleteItem'])->name('items.destroy');
        });
    });

    // E-Commerce Logistics, Core Settings & Sub-System Boundaries Area
    Route::prefix('commerce')->name('commerce.')->group(function () {

        // Physical Infrastructure & Stock Inventory Locations
        Route::resource('warehouses', WarehouseController::class);
        Route::patch('warehouses/{warehouse}/toggle', [WarehouseController::class, 'toggle'])->name('warehouses.toggle');

        // Fulfillment Deliveries, Custom Carriage & Shipping Methods
        Route::resource('shipping-methods', ShippingController::class);
        Route::patch('shipping-methods/{shipping_method}/toggle', [ShippingController::class, 'toggle'])->name('shipping-methods.toggle');

        // Transaction Gateways, Invoicing Protocols & Payment Methods
        Route::resource('payment-methods', PaymentMethodController::class);
        Route::patch('payment-methods/{payment_method}/toggle', [PaymentMethodController::class, 'toggle'])->name('payment-methods.toggle');
    });
});
