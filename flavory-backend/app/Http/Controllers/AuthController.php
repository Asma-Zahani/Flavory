<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // return [ 'user' => "1" ];
        $validatedData = $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);
        $validatedData['role'] = RoleEnum::CLIENT->value;
        
        $user = User::create($validatedData);
        
        $token = Str::random(60);

        // Stocker temporairement dans le cache (ex: Redis) avec une expiration de 1 heure
        Cache::put("email_verification_{$token}", $user->id, now()->addHour());

        Mail::to($user->email)->send(new VerifyEmail($user, $token));

        return response()->json(['message' => "Account created. Please verify your email.", 'user_id' => $user->id], 201);  
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);
        $user = User::where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response()->json(['errors' => ['email' => ['Invalid credentials.']]], 401);
        }

        if (!$user->email_verified_at) {
            return response()->json(['errors' => ['email' => ['Your email address has not been verified.']]], 403);
        }

        $token = $user->createToken($user->prenom.' '.$user->nom)->plainTextToken;
        
        // return [ 'user' => $user, 'token' => $token ];
        return response()->json(['user' => $user, 'token' => $token])->cookie('token', $token, 60 * 24 * 7, '/', null, true, true, false, 'Lax');
    }

    public function verifyEmail(Request $request)
    {
        $token = $request->input('token');
        
        if (!$token) {
            return response()->json(['message' => 'Invalid token.'], 400);
        }
    
        $userId = Cache::get("email_verification_{$token}");

        if (!$userId) {
            return response()->json(['message' => 'Token expired or invalid.'], 400);
        }

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $user->email_verified_at = now();
        $user->save();

        Cache::forget("email_verification_{$token}");
        
        return response()->json(['message' => 'Email verified successfully. You can now log in.'], 200);
    }

    public function updatePassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed'
        ]);

        if (!Hash::check($validatedData['current_password'], $user->password)) {
            return response()->json(['errors' => ['current_password' => 'The current password is incorrect.']], 400);
        }

        $user->password = Hash::make($validatedData['new_password']);
        $user->save();
        
        return response()->json(['message' => 'Password updated successfully.'], 200);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        
        return response()->json(['message' => 'You are logged out'], 201)->withoutCookie('token');
    }
}
