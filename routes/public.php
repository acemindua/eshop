<?php

use App\Http\Controllers\Public\HomeController;
use Illuminate\Support\Facades\Route;


//
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/category__{category:slug}', 'categoryShow')->name('category.show');
    Route::get('/{slug}/{optional?}', 'resolveDynamicRoute')
        ->where('slug', '[a-z0-9-]+')
        ->name('page.show');
});
