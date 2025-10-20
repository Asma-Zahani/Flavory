<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Step;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class StepController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    /**
     * Liste toutes les étapes
     */
    public function index()
    {
        $steps = Step::with('images')->get();
        return response()->json($steps, 200);
    }

    /**
     * Crée une nouvelle étape (avec images multiples)
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'recipe_id' => 'required|exists:recipes,recipe_id',
            'step_number' => 'required|integer',
            'title' => 'nullable|string|max:255',
            'instruction' => 'required|string',
            'images' => 'array',
            'images.*.image_path' => 'required|string|max:255'
        ]);

        // Créer l’étape
        $step = Step::create([
            'recipe_id' => $validatedData['recipe_id'],
            'step_number' => $validatedData['step_number'],
            'title' => $validatedData['title'] ?? null,
            'instruction' => $validatedData['instruction'],
        ]);

        // Créer les images associées
        if (isset($validatedData['images'])) {
            foreach ($validatedData['images'] as $imgData) {
                $step->images()->create([
                    'image_path' => $imgData['image_path']
                ]);
            }
        }

        return response()->json([
            'message' => 'Step created successfully',
            'data' => $step->load('images')
        ], 201);
    }

    /**
     * Affiche une étape spécifique
     */
    public function show($id)
    {
        $step = Step::with('images')->findOrFail($id);
        return response()->json($step, 200);
    }

    /**
     * Met à jour une étape (et ses images)
     */
    public function update(Request $request, $id)
    {
        $step = Step::findOrFail($id);

        $validatedData = $request->validate([
            'step_number' => 'nullable|integer',
            'title' => 'nullable|string|max:255',
            'instruction' => 'nullable|string',
            'images' => 'array',
            'images.*.image_path' => 'required|string|max:255'
        ]);

        // Mettre à jour les infos de base
        $step->update([
            'step_number' => $validatedData['step_number'] ?? $step->step_number,
            'title' => $validatedData['title'] ?? $step->title,
            'instruction' => $validatedData['instruction'] ?? $step->instruction,
        ]);

        // Supprimer les anciennes images si de nouvelles sont envoyées
        if (isset($validatedData['images'])) {
            $step->images()->delete();
            foreach ($validatedData['images'] as $imgData) {
                $step->images()->create([
                    'image_path' => $imgData['image_path']
                ]);
            }
        }

        return response()->json([
            'message' => 'Step updated successfully',
            'data' => $step->load('images')
        ], 200);
    }

    /**
     * Supprime une étape
     */
    public function destroy($id)
    {
        $step = Step::findOrFail($id);
        $step->images()->delete();
        $step->delete();

        return response()->json([
            'message' => 'Step deleted successfully'
        ], 200);
    }
}