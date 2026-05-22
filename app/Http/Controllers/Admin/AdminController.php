<?php

namespace App\Http\Controllers\Admin;

use App\Facades\Settings;
use App\Http\Controllers\Controller;
use App\Models\Option;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display the main admin dashboard.
     */
    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard');
    }

    /**
     * Show global system settings and options.
     */
    public function options(): Response
    {
        return Inertia::render('Admin/Settings/Options', [
            'data' => [
                'settings' => Option::all(['id', 'key', 'value', 'description']),
            ],
        ]);
    }

    /**
     * Handle the batch update process for global settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => 'required|integer|exists:options,id',
            'settings.*.key' => 'required|string|max:255',
            'settings.*.value' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                foreach ($validated['settings'] as $optionData) {
                    Settings::set($optionData['key'], $optionData['value']);
                }
            });

            // Повертаємо уніфіковану структуру 'alert' для успішного результату
            return redirect()->back()->with([
                'alert' => [
                    'type'    => 'success',
                    'message' => 'Налаштування сайту успішно оновлено!',
                ],
            ]);
        } catch (\Exception $e) {
            // Повертаємо уніфіковану структуру 'alert' для помилки
            return redirect()->back()->with([
                'alert' => [
                    'type'    => 'error',
                    'message' => 'Помилка при оновленні налаштувань.',
                ],
            ]);
        }
    }
}
