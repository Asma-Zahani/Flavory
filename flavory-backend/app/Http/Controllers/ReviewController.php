<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['show'])
        ];
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'recipe_id' => 'required|integer|exists:recipes,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::create($validatedData);

        return response()->json([
            'message' => 'Review added successfully',
            'data' => $review,
        ], 201);
    }

    public function show($id)
    {
        $review = Review::with(['images'])->findOrFail($id);

        return response()->json($review);
    }
    
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if ($request->user()->id !== $review->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'recipe_id' => 'required|integer|exists:recipes,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validatedData);

        return response()->json([
            'message' => 'Review updated successfully',
            'data' => $review,
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        
        if ($request->user()->id !== $review->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        $review->delete();
        
        return response()->json([
            'message' => 'Review deleted successfully'
        ], 200);
    }
}
