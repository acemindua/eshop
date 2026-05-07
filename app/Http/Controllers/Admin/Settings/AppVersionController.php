<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Filters\VersionFilter;
use App\Http\Controllers\Controller;
use App\Models\AppVersion;
use App\Models\AppVersionItem;
use App\Http\Requests\StoreAppVersionRequest;
use App\Http\Requests\UpdateAppVersionRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppVersionController extends Controller
{
    /**
     * Список версій із завданнями
     */
    public function index(VersionFilter $filter): Response
    {
        Gate::authorize('viewAny', AppVersion::class);

        $versions = AppVersion::filter($filter)
            ->with(['items' => fn($q) => $q->orderBy('sort_order')])
            ->orderByDesc('version')
            ->get()
            ->values();

        return Inertia::render('Admin/Settings/Versions/Index', [
            'data' => [
                'versions' => $versions,
                'filters' => request()->all(['search', 'status'])
            ]
        ]);
    }

    /**
     * Створення нової версії
     */
    public function store(StoreAppVersionRequest $request)
    {
        Gate::authorize('create', AppVersion::class);

        AppVersion::create($request->validated());

        return redirect()->back()->with('success', 'Версію успішно створено');
    }

    /**
     * Оновлення основних даних версії
     */
    public function update(UpdateAppVersionRequest $request, AppVersion $appVersion)
    {
        Gate::authorize('update', $appVersion);

        $appVersion->update($request->validated());

        // Після ручного оновлення (наприклад, змінили дату) про всяк випадок синхронізуємо статус
        $this->syncStatus($appVersion->id);

        return redirect()->back()->with('success', 'Дані версії оновлено');
    }

    /**
     * Видалення версії
     */
    public function destroy(AppVersion $appVersion)
    {
        Gate::authorize('delete', $appVersion);

        $appVersion->delete();

        return redirect()->back()->with('success', 'Версію видалено');
    }

    // --- Методи для Чекліста (Items) ---

    /**
     * Додавання пункту в чекліст
     */
    public function addItem(Request $request, AppVersion $appVersion)
    {
        // ЗАХИСТ: Не дозволяємо додавати завдання, якщо версія вже випущена (completed)
        if ($appVersion->status === 'completed') {
            return redirect()->back()->with('error', 'Версія вже завершена. Змініть статус на "Active", щоб додати завдання.');
        }

        $data = $request->validate([
            'content' => 'required|string|max:500',
            'type' => 'required|in:feature,fix,improvement,other',
            'category' => 'required|in:changelog,roadmap',
        ]);

        $appVersion->items()->create($data);

        $this->syncStatus($appVersion->id);

        return redirect()->back()->with('success', 'Завдання додано');
    }

    /**
     * Редагування тексту завдання
     */
    public function updateItem(Request $request, AppVersionItem $item)
    {
        $data = $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $item->update($data);

        return redirect()->back()->with('success', 'Завдання оновлено');
    }

    /**
     * Перекидання завдання в іншу версію
     */
    public function moveItem(Request $request, AppVersionItem $item)
    {
        $request->validate([
            'app_version_id' => 'required|exists:app_versions,id'
        ]);

        $targetVersion = AppVersion::find($request->app_version_id);

        // ЗАХИСТ: Не дозволяємо перекидати завдання в уже завершену версію
        if ($targetVersion->status === 'completed') {
            return redirect()->back()->with('error', 'Цільова версія вже завершена. Перенесення неможливе.');
        }

        $oldVersionId = $item->app_version_id;

        $item->update([
            'app_version_id' => $request->app_version_id,
            'is_completed' => false
        ]);

        $this->syncStatus($oldVersionId);
        $this->syncStatus($request->app_version_id);

        return redirect()->back()->with('success', 'Завдання перенесено');
    }

    /**
     * Швидка зміна статусу виконання (Checkbox)
     */
    public function toggleItem(AppVersionItem $item)
    {
        $item->update(['is_completed' => !$item->is_completed]);

        $this->syncStatus($item->app_version_id);

        return redirect()->back();
    }

    /**
     * Видалення пункту чекліста
     */
    public function deleteItem(AppVersionItem $item)
    {
        $versionId = $item->app_version_id;
        $item->delete();

        $this->syncStatus($versionId);

        return redirect()->back()->with('success', 'Пункт видалено');
    }

    /**
     * Автоматичне оновлення статусу версії та дати релізу
     */
    protected function syncStatus($versionId)
    {
        $version = AppVersion::with('items')->find($versionId);
        if (!$version) return;

        $items = $version->items()->get();

        if ($items->isEmpty()) {
            $newStatus = 'draft';
        } else {
            $allCompleted = !$items->contains('is_completed', false);
            $newStatus = $allCompleted ? 'completed' : 'active';
        }

        $updateData = ['status' => $newStatus];

        // 1. Якщо стала 'completed', а раніше не була — ставимо дату
        if ($newStatus === 'completed' && $version->status !== 'completed') {
            $updateData['released_at'] = now();
        }

        // 2. Якщо перестала бути 'completed' — очищаємо дату
        elseif ($newStatus !== 'completed' && $version->status === 'completed') {
            $updateData['released_at'] = null;
        }

        $version->update($updateData);
    }
}
