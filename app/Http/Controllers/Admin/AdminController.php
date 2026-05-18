<?php

namespace App\Http\Controllers\Admin;

use App\Facades\Settings;
use App\Http\Controllers\Controller;
use App\Http\Resources\AppVersionResource;
use App\Models\AppVersion;
use App\Models\Item;
use App\Models\Option;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{

    // Dashboard
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            
        ]);
    }

    // Settings
    public function options(): Response
    {
        return Inertia::render('Admin/Settings/Options', [
            'data' => [
                'settings' => Option::all(),
            ],
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