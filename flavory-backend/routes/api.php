<?php

use App\Enums\CategoryEnum;
use App\Enums\DifficultyEnum;
use App\Enums\TypeRecipeIngredientEnum;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('user', function (Request $request) {
    return ($request->user())->load('favorites', 'recipes');
});
Route::middleware(['auth:sanctum'])->get('recipeAdded', function (Request $request) {
    return (($request->user())->recipes()->paginate(4));
});

Route::get('enums', function () {
    $categories = array_map(fn($etat) => [
        'value' => $etat->value,
        'label' => $etat->value
    ], CategoryEnum::cases());

    $difficulties = array_map(fn($etat) => [
        'value' => $etat->value,
        'label' => $etat->value
    ], DifficultyEnum::cases());

    $typesRecipeIngredient = array_map(fn($etat) => [
        'value' => $etat->value,
        'label' => $etat->value
    ], TypeRecipeIngredientEnum::cases());

    return response()->json([
        'categories' => $categories,
        'difficulties' => $difficulties,
        'typesRecipeIngredient' => $typesRecipeIngredient,
    ]);
});
Route::get('ingredients', function () {return response()->json(Ingredient::all(), 200);});
Route::get('recipes/category/{category}', [RecipeController::class, 'getByCategory']);
Route::get('recipes/latest/{limit}', [RecipeController::class, 'getLatestRecipes']);

Route::post('ingredients', function (Request $request) {
    $validatedData = $request->validate(['name' => 'required|string|max:255']);
    $ingredient = Ingredient::create($validatedData);

    return response()->json([
        'message' => 'Ingredient added successfully',
        'data' => $ingredient
    ], 201);
});
Route::post('favorite', [UserController::class, 'storeOrUpdateFavorite']);
Route::post('/upload', [UploadController::class, 'store']);

Route::put('/deleteImages/{type}/{id}', [UploadController::class, 'deleteImages']);

Route::apiResource('users', UserController::class);
Route::apiResource('recipes', RecipeController::class);
Route::apiResource('reviews', ReviewController::class);
require __DIR__.'/auth.php';