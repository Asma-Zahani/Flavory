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

        return response()->json(['message' => "Compte créé. Veuillez vérifier votre email.", 'user_id' => $user->id], 201);  
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required',
            'isChecked' => 'nullable|boolean',
        ]);
        
        $user = User::where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response()->json(['errors' => ['email' => ['Les identifiants sont incorrects.']]], 401);
        }

        if (!$user->email_verified_at) {
            return response()->json(['errors' => ['email' => ['Votre adresse email n\'a pas été vérifiée.']]], 403);
        }
        $token = $user->createToken($user->prenom.' '.$user->nom);
        
        if ($validatedData['isChecked'] ?? null) {
            $rememberToken = bin2hex(random_bytes(32));
            $user->remember_token = $rememberToken;
            $user->save();

            return [
                'user' => $user,
                'token' => $token->plainTextToken,
                'rememberToken' => $rememberToken
            ];
        }
        
        return [ 'user' => $user, 'token' => $token->plainTextToken ];
    }

    public function verifyEmail(Request $request)
    {
        $token = $request->input('token');
        
        if (!$token) {
            return response()->json(['message' => 'Token invalide.'], 400);
        }
    
        $userId = Cache::get("email_verification_{$token}");

        if (!$userId) {
            return response()->json(['message' => 'Token expiré ou invalide.'], 400);
        }

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        $user->email_verified_at = now();
        $user->save();

        Cache::forget("email_verification_{$token}");
        
        return response()->json(['message' => 'Email vérifié avec succès. Vous pouvez maintenant vous connecter.'], 200);
    }
}
