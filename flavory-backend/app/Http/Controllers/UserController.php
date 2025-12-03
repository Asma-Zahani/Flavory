<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index'])
        ];
    }

    public function index(Request $request)
    {
        $query = User::query();

        $perPage = $request->get('per_page', 10);
        $users = $query->paginate($perPage);
        
        return response()->json($users);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
        ]);

        $user->update($validatedData);
        
        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }


    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }

    public function storeOrUpdateFavorite(Request $request)
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
            Favorite::create($validatedData);
            return response()->json(['message' => 'Favorite added'], 201);
        }
    }
}