<?php

namespace App\Http\Controllers;

use App\Enums\CategoryEnum;
use App\Enums\DifficultyEnum;
use App\Enums\TypeRecipeIngredientEnum;
use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\Step;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
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
        // if (!$request->hasFile('image')) {
        //     return response()->json(['error' => 'No file received']);
        // }

        // $file = $request->file('image');
        // $result = Cloudinary::upload($file->getRealPath());

        // return response()->json([
        //     'url' => $result->getSecurePath(),
        // ]);

        $validatedData = $request->validate([
            'author_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|max:255',
            'image' => 'required',
            'category' => ['required', Rule::in(CategoryEnum::values())],
            'difficulty' => ['required', Rule::in(DifficultyEnum::values())],
            'cookingTime' => 'required|integer',
            'numberPerson' => 'required|integer',
            'description' => 'required|string',
            'recipeIngredients' => ['array', 'required', 'min:1'],
            'recipeIngredients.*.ingredient.id' => ['required', 'integer', 'exists:ingredients,id'],
            'recipeIngredients.*.type' => ['required', Rule::in(TypeRecipeIngredientEnum::values())],
            'recipeIngredients.*.quantity' => ['required', 'integer'],
            'recipeIngredients.*.unit' => ['nullable', 'string'],
            'calories' => 'nullable|integer',
            'fat' => 'nullable|integer',
            'protein' => 'nullable|integer',
            'sugars' => 'nullable|integer',
            'carbs' => 'nullable|integer',
            'recipeSteps' => ['array', 'required', 'min:1'],
            'recipeSteps.*.title' => ['required', 'string'],
            'recipeSteps.*.step_number' => ['required', 'integer'],
            'recipeSteps.*.instruction' => ['required', 'string'],
            'recipeSteps.*.images' => ['array', 'nullable'],
            'recipeSteps.*.images.*.image_path' => ['nullable', 'string'],
        ]);
        
        $recipe = Recipe::create($validatedData);

        foreach ($validatedData['recipeIngredients'] as $ingredient) {
            RecipeIngredient::create([
                'recipe_id' => $recipe->id,
                'ingredient_id' => $ingredient['ingredient']['id'],
                'type' => $ingredient['type'],
                'quantity' => $ingredient['quantity'],
                'unit' => $ingredient['unit'] ?? null,
            ]);
        }

        foreach ($validatedData['recipeSteps'] as $step) {
            $stepModel = Step::create([
                'recipe_id' => $recipe->id,
                'step_number' => $step['step_number'],
                'title' => $step['title'],
                'instruction' => $step['instruction'],
            ]);

            if (!empty($step['images'])) {
                foreach ($step['images'] as $img) {
                    $stepModel->images()->create([
                        'image_path' => $img['image_path'],
                    ]);
                }
            }
        }

        
        return response()->json([
            'message' => 'Recipe added successfully',
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
        $recipe = Recipe::findOrFail($id);

        $validatedData = $request->validate([
            'author_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|max:255',
            'image' => 'required',
            'category' => ['required', Rule::in(CategoryEnum::values())],
            'difficulty' => ['required', Rule::in(DifficultyEnum::values())],
            'cookingTime' => 'required|integer',
            'numberPerson' => 'required|integer',
            'description' => 'required|string',
            'recipeIngredients' => ['array', 'required', 'min:1'],
            'recipeIngredients.*.ingredient.id' => ['required', 'integer', 'exists:ingredients,id'],
            'recipeIngredients.*.type' => ['required', Rule::in(TypeRecipeIngredientEnum::values())],
            'recipeIngredients.*.quantity' => ['required', 'integer'],
            'recipeIngredients.*.unit' => ['nullable', 'string'],
            'calories' => 'nullable|integer',
            'fat' => 'nullable|integer',
            'protein' => 'nullable|integer',
            'sugars' => 'nullable|integer',
            'carbs' => 'nullable|integer',
            'recipeSteps' => ['array', 'required', 'min:1'],
            'recipeSteps.*.title' => ['required', 'string'],
            'recipeSteps.*.step_number' => ['required', 'integer'],
            'recipeSteps.*.instruction' => ['required', 'string'],
            'recipeSteps.*.images' => ['array', 'nullable'],
            'recipeSteps.*.images.*.image_path' => ['nullable', 'string'],
        ]);

        $recipe->update($validatedData);

        DB::transaction(function() use ($recipe, $validatedData) {
            foreach ($validatedData['recipeIngredients'] as $ingredient) {
                RecipeIngredient::updateOrCreate(
                    [
                        'recipe_id' => $recipe->id,
                        'ingredient_id' => $ingredient['ingredient']['id'],
                    ],
                    [
                        'type' => $ingredient['type'],
                        'quantity' => $ingredient['quantity'],
                        'unit' => $ingredient['unit'] ?? null,
                    ]
                );
            }
            foreach ($validatedData['recipeSteps'] as $step) {
                $stepModel = Step::updateOrCreate(
                    [
                        'recipe_id' => $recipe->id,
                        'step_number' => $step['step_number'],
                    ],
                    [
                        'title' => $step['title'],
                        'instruction' => $step['instruction'],
                    ]
                );

                if (!empty($step['images'])) {
                    foreach ($step['images'] as $img) {
                        $stepModel->images()->updateOrCreate(
                            ['image_path' => $img['image_path']],
                            ['image_path' => $img['image_path']]
                        );
                    }
                }
            }
        });

        return response()->json(['message' => 'Recipe updated successfully'], 200);
    }


    public function destroy($id)
    {
        Recipe::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Recipe deleted successfully'
        ], 200);
    }
}