<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnumsController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/enums', [EnumsController::class, 'getEnums']);

Route::apiResource('recipes', RecipeController::class);
Route::get('ingredients', [IngredientController::class, 'index']);
Route::get('recipes/category/{category}', [RecipeController::class, 'getByCategory']);
Route::get('recipes/latest/{limit}', [RecipeController::class, 'getLatestRecipes']);
Route::apiResource('steps', StepController::class);

require __DIR__.'/auth.php';