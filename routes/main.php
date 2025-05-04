<?php

use App\Http\Controllers\Main\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/category__{slug}', [HomeController::class, 'category'])->name('category');
Route::get('/{slug}/p{id}/', [HomeController::class, 'show'])->name('product.show');

Route::middleware('auth')->group(function () {
    Route::get('/account', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::delete('/account', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
