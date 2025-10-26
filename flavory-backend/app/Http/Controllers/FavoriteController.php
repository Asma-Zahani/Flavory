<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class FavoriteController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    public function storeOrUpdate(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'recipe_id' => 'required|integer|exists:recipes,id'
        ]);

        $favorite = Favorite::where('user_id', $validatedData['user_id'])
                        ->where('recipe_id', $validatedData['recipe_id'])
                        ->first();
                        
        if ($favorite) {
            Favorite::where('user_id', $validatedData['user_id'])
                   ->where('recipe_id', $validatedData['recipe_id'])
                   ->delete();
            return response()->json(['message' => 'Favorite removed'], 200);
        } else {
            $newFavorite = Favorite::create($validatedData);
            return response()->json(['message' => 'Favorite added'], 201);
        }
    }
}
