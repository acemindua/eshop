<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Throwable;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to Google’s OAuth page.
     */
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback from Google.
     */
    public function callback()
    {
        try {
            // Get the user information from Google
            $user = Socialite::driver('google')->user();
        } catch (Throwable $e) {

            return redirect('/')->with([
                'alert' => [
                    'type' => 'error',
                    'message' => "Google authentication failed.",
                ],
            ]);
        }

        // Перевіряємо, чи Google повернув name, якщо ні - даємо значення за замовчуванням
        $name = $user->name ?? 'User ' . Str::random(5);

        // Check if the user already exists in the database
        $existingUser = User::where('email', $user->email)->first();

        if ($existingUser) {
            // Log the user in if they already exist
            Auth::login($existingUser);
        } else {

            // Otherwise, create a new user and log them in
            $newUser = User::create([
                'email' => $user->email,
                'name' => $name,
                'password' => Hash::make(Str::random(16)), // Set a random password
                'email_verified_at' => now()
            ]);

            $newUser->assignRole('auth');

            event(new Registered($newUser));

            Auth::login($newUser);
        }

        // Redirect the user to the dashboard or any other secure page
        return redirect('/');
    }
}
