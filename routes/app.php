<?php

use App\Http\Controllers\App\Commerce\CategoryController;
use App\Http\Controllers\App\Commerce\ManufacturerController;
use App\Http\Controllers\App\Commerce\OrderController;
use App\Http\Controllers\App\Commerce\ProductController;
use App\Http\Controllers\App\Commerce\AttributeController;
use App\Http\Controllers\App\Commerce\OptionController;
use App\Http\Controllers\App\DashboardController;
use App\Http\Controllers\App\Settings\LanguageController;
use App\Http\Controllers\App\Settings\MessengerController;
use App\Http\Controllers\App\Settings\RolePermissionController;
use App\Http\Controllers\App\Settings\SettingController;
use App\Http\Controllers\App\UserController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;


Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::resources([
    'users'         => UserController::class,
]);

Route::prefix('commerce')->group(function () {
    // Видалення зображення
    Route::delete('categories/{category}/image', [CategoryController::class, 'destroyImage'])->name('categories.image.destroy');
    Route::delete('manufacturers/{manufacturer}/image', [ManufacturerController::class, 'destroyImage'])->name('manufacturers.image.destroy');
    Route::resources([
        'orders'        => OrderController::class,
        'categories'    => CategoryController::class,
        'products'      => ProductController::class,
        'manufacturers' => ManufacturerController::class,
        'attributes'    => AttributeController::class,
        'options'       => OptionController::class,
    ]);
});
Route::prefix('messages')->group(function () {
    Route::get('/', [ChatController::class, 'index'])->name('chat.rooms');
});
Route::prefix('settings')->group(function () {
    Route::resources([
        'settings'          => SettingController::class,
        'messangers'        => MessengerController::class,
        'languages'         => LanguageController::class,
        'roles'             => RolePermissionController::class,

    ]);
});
