<?php

use App\Http\Controllers\Public\AccountController;
use App\Http\Controllers\Public\HomeController;
use Illuminate\Support\Facades\Route;


Route::controller(AccountController::class)->prefix('account')->group(
    function () {
        Route::get('/', 'index')->name('account');
    }
);

//
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/search', 'search')->name('search');
    Route::get('/category__{category:slug}', 'categoryShow')->name('category.show');
    Route::get('/brand__{brand:slug}', 'brandShow')->name('brand.show');
    Route::get('/{slug}/{optional?}', 'resolveDynamicRoute')
        ->where('slug', '[a-z0-9-]+')
        ->name('page.show');
});
