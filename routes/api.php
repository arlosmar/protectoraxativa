<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\APIController;

// /api/token
Route::post('/token', [APIController::class, 'token']);

// must be logged in. it means it expects Bearer XXXXX with token
Route::get('/news', [APIController::class, 'news'])->middleware('auth:sanctum');