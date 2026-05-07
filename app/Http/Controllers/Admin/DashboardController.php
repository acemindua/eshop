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

class DashboardController extends Controller
{
    // Dashboard
    public function index(): Response
    {
        // Кешуємо統計 на 5 хвилин, щоб не навантажувати БД при кожному рефреші
        $stats = Cache::remember('admin_dashboard_stats', 300, function () {
            return [
                'users' => [
                    'total' => User::count(),
                    'new_this_month' => User::where('created_at', '>=', now()->startOfMonth())->count(),
                ],
                'items' => [
                    'total' => Item::count(),
                    'out_of_stock' => Item::where('quantity', '<=', 0)->count(),
                    'active' => Item::where('public', true)->count(),
                ],
                'ecommerce' => [
                    'total_value' => Item::sum(DB::raw('price * quantity')), // Оціночна вартість складу
                ]
            ];
        });

        $latestVersions = AppVersion::query()
            ->with(['items'])
            ->withCount([
                'items',
                'items as completed_items_count' => fn($q) => $q->where('is_completed', true)
            ])
            ->orderByRaw('released_at IS NULL DESC, released_at DESC, version DESC')
            ->limit(7)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'versions' => AppVersionResource::collection($latestVersions)->resolve(),
            'stats' => $stats,
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
