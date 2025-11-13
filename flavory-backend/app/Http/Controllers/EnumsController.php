<?php

namespace App\Http\Controllers;

use App\Enums\CategoryEnum;
use App\Enums\DifficultyEnum;
use App\Enums\TypeRecipeIngredientEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class EnumsController extends Controller
{
    public function getEnums(): JsonResponse
    {
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
    }
}