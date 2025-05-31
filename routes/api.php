<?php

use App\Http\Controllers\Api\AttributeController;
use App\Http\Controllers\API\AttributeValueController;
use App\Http\Controllers\API\ChatRooms\TelegramController;
use App\Http\Controllers\API\V1\MediaController;
use App\Http\Controllers\API\V1\MessageController;
use App\Http\Controllers\API\ProductMediaController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\UploadImageController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\V1\DataController;
use App\Http\Controllers\API\V1\ProductController;
use App\Http\Controllers\API\V1\ProductVariantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/telegram/webhook', [TelegramController::class, 'webhook']);

//
Route::apiResource('reviews', ReviewController::class);

Route::prefix('v1')->group(function () {
    Route::prefix('chat')->group(function () {
        Route::apiResource('messages', MessageController::class);
        Route::apiResource('telegram-messages', TelegramController::class);
    });
    // E-Commerce
    Route::apiResource('products', ProductController::class);
    Route::apiResource('product-variants', ProductVariantController::class);
    Route::apiResource('attributes', AttributeController::class);
    Route::apiResource('attribute-values', AttributeValueController::class);
    Route::apiResource('media', MediaController::class);
    Route::post('/media/sort', [MediaController::class, 'sort'])->name('media.sort');

    // DataController
    Route::get('/data', [DataController::class, 'index'])->name('api.data');
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    Route::get('/stats/users', [UserController::class, 'index'])->name('api.stats.users');
    Route::get('/stats/products', [ProductController::class, 'index'])->name('api.stats.products');

    // Product Image
    Route::get('/products/{product}/media', [ProductMediaController::class, 'get'])->name('products.media');
    Route::post('/products/{product}/media', [ProductMediaController::class, 'store'])->name('products.media.store');
    Route::post('/products/{product}/media/sort', [ProductMediaController::class, 'sort'])->name('products.media.sort');
    Route::delete('/products/{product}/media/{id}', [ProductMediaController::class, 'destroy'])->name('products.media.delete');
});

Route::post('/store/upload/image', [UploadImageController::class, 'store'])->name('api.upload.image');
