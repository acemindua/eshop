<?php

use App\Http\Controllers\Main\HomeController;
use Illuminate\Support\Facades\Route;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');

    // Окремий маршрут для категорій (із префіксом)
    Route::get('/category__{slug}', 'showCategoryPage')->name('category');

    // Універсальний маршрут: продукт або сторінка
    Route::get('/{slug}/{optional?}', 'resolveDynamicRoute')
        ->where('slug', '[a-z0-9-]+')
        ->name('dynamic.route');
});