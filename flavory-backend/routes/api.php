<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnumsController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\RecipeController;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return ($request->user())->load('favorites');
});

Route::get('/enums', [EnumsController::class, 'getEnums']);

Route::apiResource('recipes', RecipeController::class);
Route::get('ingredients', [IngredientController::class, 'index']);
Route::post('ingredients', [IngredientController::class, 'store']);
Route::post('favorite', [FavoriteController::class, 'storeOrUpdate']);
Route::get('recipes/category/{category}', [RecipeController::class, 'getByCategory']);
Route::get('recipes/latest/{limit}', [RecipeController::class, 'getLatestRecipes']);
Route::apiResource('steps', StepController::class);

Route::get('/cloudinary-check', function () {
    try {
        $account = Cloudinary::config();
        return response()->json([
            'cloud_name' => $account->cloud->name ?? 'ok',
            'api_key' => $account->api->key ?? 'ok',
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
});

require __DIR__.'/auth.php';