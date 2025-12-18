<?php

namespace App\Http\Controllers\Admin;

use App\Facades\Settings;
use App\Http\Controllers\Controller;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    // Dashboard
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'status' => session('status'),
        ]);
    }

    // Settings
    public function settings(): Response
    {
        $settings = Option::all();

        return Inertia::render('Admin/Settings', [
            'data' => [
                'settings' =>  $settings,
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Обробляє POST-запит на оновлення всіх налаштувань.
     * Викликається при відправці форми.
     */
    public function update(Request $request)
    {
        // 1. Валідація вхідних даних
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => 'required|integer|exists:options,id',
            'settings.*.key' => 'required|string|max:255',
            'settings.*.value' => 'nullable|string',
        ]);

        try {
            // 2. Використання транзакції для безпечного масового оновлення
            DB::transaction(function () use ($validated) {
                foreach ($validated['settings'] as $optionData) {
                    Option::where('id', $optionData['id'])
                        ->update([
                            'value' => $optionData['value']
                        ]);
                }
            });

            // 3. Очищення кешу (якщо він буде реалізований)
            Settings::forgetCache();

            return redirect()->back()
                ->with('success', 'Налаштування сайту успішно оновлено!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Помилка при оновленні налаштувань.');
        }
    }
}
