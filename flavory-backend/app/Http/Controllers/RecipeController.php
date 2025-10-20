<?php

namespace App\Http\Controllers;

use App\Enums\CategoryEnum;
use App\Enums\DifficultyEnum;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class RecipeController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index', 'getByCategory', 'getLatestRecipes','show'])
        ];
    }

    public function index(Request $request)
    {
        $query = Recipe::query();

        if ($request->has('title') && !empty($request->title)) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->has('category') && !empty($request->category)) {
            $query->where('category', 'like', '%' . $request->category . '%');
        }

        if ($request->has('ingredient') && !empty($request->ingredient)) {
            $ingredient = $request->ingredient;
            $query->whereHas('recipeIngredients.ingredient', function ($q) use ($ingredient) {
                $q->where('name', 'like', '%' . $ingredient . '%');
            });
        }

        $recipes = $query->get();

        return response()->json($recipes);
    }

    public function getLatestRecipes($limit)
    {
        $recipes = Recipe::latest('created_at')->take($limit)->get();

        return response()->json($recipes);
    }


    public function getByCategory($category, Request $request)
    {
        $query = Recipe::where('category', $category);

        if ($request->has('title') && !empty($request->title)) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->has('ingredient') && !empty($request->ingredient)) {
            $ingredient = $request->ingredient;
            $query->whereHas('recipeIngredients.ingredient', function ($q) use ($ingredient) {
                $q->where('name', 'like', '%' . $ingredient . '%');
            });
        }

        $recipes = $query->get();

        return response()->json($recipes);
    }

    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'image' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cookingTime' => 'nullable|string',
            'difficulty' => [Rule::in(DifficultyEnum::values())],
            'numberPerson' => 'nullable|integer',
            'category' => [Rule::in(CategoryEnum::values())],
            'calories' => 'nullable|numeric',
            'fat' => 'nullable|numeric',
            'protein' => 'nullable|numeric',
            'sugars' => 'nullable|numeric',
            'carbs' => 'nullable|numeric'
        ]);

        // Création de la recette
        $recipe = Recipe::create($validatedData);

        return response()->json([
            'message' => 'Recipe added successfully',
            'data' => $recipe
        ], 201);
    }

    public function show($id)
    {
        $recipe = Recipe::with([
            'recipeIngredients.ingredient', 'steps.images', 'author'
        ])->findOrFail($id);

        return response()->json($recipe);
    }


    public function update(Request $request, $id)
    {
        // Récupérer la recette
        $recipe = Recipe::findOrFail($id);

        // Validation des données
        $validatedData = $request->validate([
            'image' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'cookingTime' => 'nullable|string',
            'difficulty' => 'nullable|string',
            'numberPerson' => 'nullable|integer',
            'category' => [Rule::in(CategoryEnum::values())],
            'calories' => 'nullable|numeric',
            'fat' => 'nullable|numeric',
            'protein' => 'nullable|numeric',
            'sugars' => 'nullable|numeric',
            'carbs' => 'nullable|numeric'
        ]);

        // Mettre à jour la recette
        $recipe->update($validatedData);

        // Retourner la réponse JSON
        return response()->json([
            'message' => 'Recipe updated successfully',
            'data' => $recipe
        ], 200);
    }

    public function destroy($id)
    {
        Recipe::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Catégorie supprimée avec succès'
        ], 200);
    }
}