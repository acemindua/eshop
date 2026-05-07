<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(Request $request): Response
    {
        // Модель User вже має $appends = ['avatar', 'full_name'],
        // тому ці дані автоматично потраплять у відповідь.
        return Inertia::render('Public/Account/Index', [
            'data' => [
                'user' => $request->user(),
                'orders' => $request->user()->orders ?? [], // Додайте зв'язок у модель User, якщо його ще немає
                'locale' => app()->getLocale()
            ]
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:25',
            'birthday' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'preferred_locale' => 'nullable|in:uk,en',
        ]);

        $user->update($validated);

        // Оновлюємо локаль в сесії, якщо вона була змінена
        if ($request->has('preferred_locale')) {
            session(['locale' => $request->preferred_locale]);
        }

        return back()->with('success', 'Профіль оновлено');
    }

    public function updateAvatar(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);
        $request->user()->clearMediaCollection('avatars');
        // Використовуємо вашу колекцію 'avatars'
        $request->user()
            ->addMediaFromRequest('avatar')
            ->toMediaCollection('avatars');

        return back();
    }
}
