<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
// use App\Mail\LoginSuccessEmail;
use Illuminate\Support\Facades\Mail;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class,'login']);

Route::post('/verify-email', [AuthController::class, 'verifyEmail']);

Route::put('/updatePassword/{id}', [AuthController::class, 'updatePassword'])->middleware('auth:sanctum');

Route::post('logout', [AuthController::class,'logout'])->middleware('auth:sanctum');

/*
Route::post('autoLogin', [AuthController::class,'autoLogin']);

Route::post('/email/resend', [AuthController::class,'resend']);


Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);

Route::post('/forgot-password/resend', [AuthController::class, 'resendResetLink']);

Route::post('/reset-password', [AuthController::class, 'reset']);

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
*/