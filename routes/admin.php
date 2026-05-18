<?php
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Core\{
    PageController, 
    UserController, 
    MenuController
};
use App\Http\Controllers\Admin\Settings\{
    TranslationController,
    AppVersionController
};
use Illuminate\Support\Facades\Route;

Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

// Core Resources
Route::resources([
    'users' => UserController::class,
    'pages' => PageController::class,
    'menus' => MenuController::class
]);

// Settings Group
Route::prefix('settings')->name('settings.')->group(function () {
    Route::get('/', [AdminController::class, 'options'])->name('options');

     // Translations
   Route::controller(TranslationController::class)->prefix('translations')->name('translations.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/sync', 'sync')->name('sync');
        Route::post('/update-all', 'updateAll')->name('update-all');
    });
     // 1. Roadmap & Versions (Виділяємо в окремий під-префікс)
    Route::prefix('versions')->name('versions.')->group(function () {
        Route::get('/', [AppVersionController::class, 'index'])->name('index');
        Route::post('/', [AppVersionController::class, 'store'])->name('store');
        Route::put('/{appVersion}', [AppVersionController::class, 'update'])->name('update');
        Route::delete('/{appVersion}', [AppVersionController::class, 'destroy'])->name('destroy');

        // Керування завданнями (Items) всередині версій
        Route::post('/{app_version}/items', [AppVersionController::class, 'addItem'])->name('items.store');
        Route::prefix('items/{item}')->group(function () {
            Route::patch('/toggle', [AppVersionController::class, 'toggleItem'])->name('items.toggle');
            Route::put('/', [AppVersionController::class, 'updateItem'])->name('items.update');
            Route::patch('/move', [AppVersionController::class, 'moveItem'])->name('items.move');
            Route::delete('/', [AppVersionController::class, 'deleteItem'])->name('items.destroy');
        });
    });

});
