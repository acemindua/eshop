<?php

use App\Http\Controllers\Api\HelpMainController;
use App\Http\Controllers\Api\UploadImageController;
use Illuminate\Support\Facades\Route;

Route::get('/menu', [HelpMainController::class, 'getMenu'])->name('api.get.menu');
Route::get('/menu/categories', [HelpMainController::class, 'getCategories'])->name('api.get.categories');
Route::post('/upload/image', [UploadImageController::class, 'store'])->name('api.upload.image');
