<?php

use App\Http\Controllers\Admin\Commerce\CategoryController;
use App\Http\Controllers\Admin\Commerce\ItemController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

//
Route::controller(DashboardController::class)->group(function () {
    Route::get('/', 'index')->name('dashboard');
    Route::get('/settings', 'settings')->name('settings');
    Route::post('/settings', 'update')->name('settings.update');
});
// 
Route::resources([
    'users'         => UserController::class,
    'pages'         => PageController::class
]);
/**
 * commerce
 */
Route::prefix('commerce')->group(function () {
    Route::resources([
        'categories'    => CategoryController::class,
        'items'         => ItemController::class,
    ]);
});
