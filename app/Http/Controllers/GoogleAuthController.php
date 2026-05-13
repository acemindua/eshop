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
        // Якщо ми ініціюємо логін з конкретної сторінки (наприклад, checkout),
        // Laravel може автоматично запам'ятати її, але для надійності
        // можна вручну встановити intended URL, якщо є referer.
        if (!session()->has('url.intended') && url()->previous() !== url()->current()) {
            session(['url.intended' => url()->previous()]);
        }

        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback from Google.
     */
    public function callback()
    {
        try {
            $user = Socialite::driver('google')->user();
        } catch (Throwable $e) {
            return redirect('/')->with([
                'alert' => [
                    'type' => 'error',
                    'message' => "Google authentication failed.",
                ],
            ]);
        }

        $name = $user->name ?? 'User ' . Str::random(5);
        $existingUser = User::where('email', $user->email)->first();

        if ($existingUser) {
            Auth::login($existingUser);
        } else {
            $newUser = User::create([
                'email' => $user->email,
                'name' => $name,
                'password' => Hash::make(Str::random(16)),
                'email_verified_at' => now()
            ]);

            // Припускаємо, що у тебе стоїть Spatie Permissions
            if (method_exists($newUser, 'assignRole')) {
                $newUser->assignRole('auth');
            }

            event(new Registered($newUser));
            Auth::login($newUser);
        }

        // ВАЖЛИВО: intended('/') спробує повернути юзера туди, де він був.
        // Якщо в сесії немає збереженого шляху, він піде на '/'
        return redirect()->intended('/checkout');
    }
}
