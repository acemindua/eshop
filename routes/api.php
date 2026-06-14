<?php

use App\Http\Controllers\Api\ApiItemsController;
use App\Http\Controllers\Api\{CommerceController};
use App\Http\Controllers\Api\HelpMainController;
use App\Http\Controllers\Api\UploadImageController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\NovaPoshtaController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;



Route::get('/menus', [HelpMainController::class, 'menus'])->name('api.get.menu');
Route::get('/commerce/popular', [ApiItemsController::class, 'popular'])->name('api.commerce.popular');
/**
 * Commerce
 */
Route::get('/commerce/items', [CommerceController::class, 'getItems'])->name('api.commerce.items');

Route::get('/menu', [HelpMainController::class, 'getMenu'])->name('api.menu');
Route::get('/menu/categories', [HelpMainController::class, 'getCategories'])->name('api.get.categories');
Route::post('/upload/image', [UploadImageController::class, 'store'])->name('api.upload.image');

Route::apiResource('media', MediaController::class);
Route::post('/media/sort', [MediaController::class, 'sort'])->name('media.sort');
// Reviews
Route::controller(ReviewController::class)->group(
    function () {
        Route::get('/reviews', 'index');
        Route::post('/reviews', 'store');
    }
);
Route::prefix('novaposhta')->group(function () {
    Route::get('/cities', [NovaPoshtaController::class, 'getCities'])->name('api.np.cities');
    Route::get('/warehouses', [NovaPoshtaController::class, 'getWarehouses'])->name('api.np.warehouses');
});
