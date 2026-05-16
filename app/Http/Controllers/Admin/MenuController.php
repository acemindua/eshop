<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Page;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * Список груп меню та ініціалізація даних для конструктора
     */
    public function index()
    {
        return Inertia::render('Admin/Dashboard/Menus/Index', [
            'data' => [
                'menus' => Menu::with(['items' => function ($query) {
                    // Завантажуємо лише кореневі елементи (верхній рівень)
                    $query->whereNull('parent_id')->orderBy('order');
                }, 'items.children' => function ($query) {
                    // Рекурсивно підвантажуємо вкладені пункти
                    $query->orderBy('order');
                }])->get(),

                'availablePages' => Page::all()->map(fn($p) => [
                    'id' => $p->id,
                    'title' => $p->title,
                    'type' => 'App\\Models\\Page'
                ]),

                'availableCategories' => Category::all()->map(fn($c) => [
                    'id' => $c->id,
                    'title' => $c->title,
                    'type' => 'App\\Models\\Category'
                ]),
            ]
        ]);
    }

    /**
     * Створення нової групи меню
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:menus,slug',
        ]);

        Menu::create($validated);

        return back()->with('success', 'Група меню створена');
    }

    /**
     * Оновлення структури меню (Drag & Drop)
     */
    public function update(Request $request, Menu $menu)
    {
        $itemsFromFrontend = $request->input('items', []);

        DB::transaction(function () use ($itemsFromFrontend, $menu) {
            // 1. Збираємо всі ID, які залишилися в конструкторі (щоб не видалити їх)
            $keptIds = [];
            $this->collectIds($itemsFromFrontend, $keptIds);

            // 2. Видаляємо лише ті пункти, яких більше немає у списку на фронтенді
            $menu->items()->whereNotIn('id', $keptIds)->delete();

            // 3. Синхронізуємо існуючі та нові пункти
            $this->saveMenuItemsRecursive($itemsFromFrontend, $menu->id);
        });

        return back()->with('success', 'Структуру меню успішно збережено');
    }

    /**
     * Допоміжний метод для збору всіх активних ID
     */
    private function collectIds(array $items, &$ids)
    {
        foreach ($items as $item) {
            // Якщо ID числовий і не схожий на тимчасовий таймстамп фронтенда
            if (isset($item['id']) && is_numeric($item['id']) && $item['id'] < 1000000000) {
                $ids[] = $item['id'];
            }
            if (!empty($item['children'])) {
                $this->collectIds($item['children'], $ids);
            }
        }
    }

    /**
     * Рекурсивне збереження з підтримкою вкладеності (Sync)
     */
    private function saveMenuItemsRecursive(array $items, int $menuId, int $parentId = null)
    {
        foreach ($items as $index => $item) {
            // Визначаємо, чи це старий запис, чи новий (ігноруємо великі ID-мітки з фронта)
            $id = (isset($item['id']) && is_numeric($item['id']) && $item['id'] < 1000000000)
                ? $item['id']
                : null;

            $menuItem = MenuItem::updateOrCreate(
                ['id' => $id],
                [
                    'menu_id'    => $menuId,
                    'parent_id'  => $parentId,
                    'label'      => $item['label'], // Очікується масив ['uk' => '...', 'en' => '...']
                    'model_id'   => $item['model_id'] ?? null,
                    'model_type' => $item['model_type'] ?? null,
                    'url'        => $item['url'] ?? null,
                    'order'      => $index,
                ]
            );

            // Якщо є діти, викликаємо рекурсію, передаючи ID щойно збереженого пункту
            if (!empty($item['children'])) {
                $this->saveMenuItemsRecursive($item['children'], $menuId, $menuItem->id);
            }
        }
    }

    /**
     * Видалення групи меню
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();
        return back()->with('success', 'Групу меню видалено');
    }
}
