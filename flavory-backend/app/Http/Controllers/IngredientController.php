<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class IngredientController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index'])
        ];
    }

    public function index()
    {
        return response()->json(Ingredient::all(), 200);
    }

    // public function store(Request $request)
    // {
    //     // Validation des données
    //     $validatedData = $request->validate([
    //         'image' => 'required|string|max:255',
    //         'title' => 'required|string|max:255',
    //         'description' => 'nullable|string',
    //         'cookingTime' => 'nullable|string',
    //         'difficulty' => 'nullable|string',
    //         'numberPerson' => 'nullable|integer',
    //         'calories' => 'nullable|numeric',
    //         'fat' => 'nullable|numeric',
    //         'protein' => 'nullable|numeric',
    //         'sugars' => 'nullable|numeric',
    //         'carbs' => 'nullable|numeric'
    //     ]);

    //     // Création de la recette
    //     $recipe = Recipe::create($validatedData);

    //     return response()->json([
    //         'message' => 'Recipe added successfully',
    //         'data' => $recipe
    //     ], 201);
    // }
}