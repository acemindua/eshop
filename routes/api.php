<?php

use App\Http\Controllers\Api\HelpMainController;
use Illuminate\Support\Facades\Route;

Route::get('/menu', [HelpMainController::class, 'getMenu'])->name('api.get.menu');
