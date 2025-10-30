<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\HomeController;
use Illuminate\Support\Facades\Route;


//
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
});
