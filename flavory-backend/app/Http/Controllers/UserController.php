<?php

namespace App\Http\Controllers;

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
            new Middleware('auth:sanctum')
        ];
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
}