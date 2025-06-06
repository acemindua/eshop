<?php

use App\Http\Controllers\Main\CommerceController;
use App\Http\Controllers\Main\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

//
Route::middleware('auth')->group(function () {

    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
    });
});

Route::controller(CommerceController::class)->group(function () {
    // Окремий маршрут для категорій (із префіксом)
    Route::get('/category__{slug}', 'showCategoryPage')->name('category');
});


//
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/search', 'search')->name('search');
    // Універсальний маршрут: продукт або сторінка
    Route::get('/{slug}/{optional?}', 'resolveDynamicRoute')
        ->where('slug', '[a-z0-9-]+')
        ->name('dynamic.route');
});
