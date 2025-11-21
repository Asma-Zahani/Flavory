<?php

use App\Http\Controllers\EnumsController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return ($request->user())->load('favorites', 'recipes');
});

Route::get('/enums', [EnumsController::class, 'getEnums']);

Route::get('ingredients', [IngredientController::class, 'index']);
Route::post('ingredients', [IngredientController::class, 'store']);

Route::post('favorite', [FavoriteController::class, 'storeOrUpdate']);

Route::apiResource('recipes', RecipeController::class);
Route::get('recipes/category/{category}', [RecipeController::class, 'getByCategory']);
Route::get('recipes/latest/{limit}', [RecipeController::class, 'getLatestRecipes']);

Route::apiResource('reviews', ReviewController::class);

Route::post('/upload', [UploadController::class, 'store']);
Route::put('/deleteImages/{type}/{id}', [UploadController::class, 'deleteImages']);

Route::put('users/{id}', [UserController::class, 'update']);

require __DIR__.'/auth.php';