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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $ingredient = Ingredient::create($validatedData);

        return response()->json([
            'message' => 'Ingredient added successfully',
            'data' => $ingredient
        ], 201);
    }
}