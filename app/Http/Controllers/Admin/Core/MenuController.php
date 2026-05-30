<?php

namespace App\Http\Controllers\Admin\Core;

use App\Facades\Settings;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\MenuResource;
use App\Http\Resources\PageResource;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\Page;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    protected const DIRECTORY = 'Admin/Core/Menus';
    protected const ROUTE_PREFIX = 'admin.menus';

    /**
     * Список груп меню та ініціалізація даних для конструктора
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Menu::class);

        $menus = Menu::with('items')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page'))
            ->withQueryString();

        return Inertia::render(self::DIRECTORY . '/Index', [
            'data' => [
                'items' => MenuResource::collection($menus)
            ],
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Menu::class);

        $pages = Page::query()->where('public', true)->get();
        $categories = Category::query()->where('public', true)->get();

        return Inertia::render(self::DIRECTORY . '/Create', [
            'data' => [
                'pages' => PageResource::collection($pages),
                'categories' => CategoryResource::collection($categories),
            ],
            'routePrefix' => self::ROUTE_PREFIX,
            'isEditing' => false,
        ]);
    }

    /**
     * Створення нової групи меню
     */
    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Menu::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug'  => 'required|string|unique:menus,slug',
        ]);

        $menu = Menu::create($validated);

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Menu '{$menu->title}' successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu): Response
    {
        Gate::authorize('view', $menu);

        return Inertia::render(self::DIRECTORY . '/Show', [
            'data' => [
                'menu' => new MenuResource($menu->load('items'))
            ],
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu): Response
    {
        Gate::authorize('update', $menu);

        $menu->load(['items' => function ($query) {
            $query->whereNull('parent_id')->orderBy('order');
        }, 'items.children']);

        return Inertia::render(self::DIRECTORY . '/Edit', [
            'data' => [
                'menu' => new MenuResource($menu),
                'pages' => PageResource::collection(Page::query()->where('public', true)->get()),
                'categories' => CategoryResource::collection(Category::query()->where('public', true)->get()),
            ],
            'routePrefix' => self::ROUTE_PREFIX,
            'isEditing' => true,
        ]);
    }

    /**
     * Оновлення структури меню (Drag & Drop)
     */
    public function update(Request $request, Menu $menu): RedirectResponse
    {
        //dd($request->all());

        Gate::authorize('update', $menu);

        $itemsFromFrontend = $request->input('items', []);

        DB::transaction(function () use ($itemsFromFrontend, $menu) {
            $keptIds = [];
            $this->collectIds($itemsFromFrontend, $keptIds);

            // Видаляємо лише ті пункти, яких більше немає у списку на фронтенді
            $menu->items()->whereNotIn('id', $keptIds)->delete();

            // Синхронізуємо існуючі та нові пункти
            $this->saveMenuItemsRecursive($itemsFromFrontend, $menu->id);
        });

        return redirect()->back()->with([
            'alert' => [
                'type' => 'success',
                'message' => "Menu `{$menu->title}` successfully updated!",
            ],
        ]);
    }

    /**
     * Видалення групи меню
     */
    public function destroy(Menu $menu): RedirectResponse
    {
        Gate::authorize('delete', $menu);

        $menu->delete();

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Menu `{$menu->title}` successfully deleted!",
            ],
        ]);
    }

    /**
     * Допоміжний метод для збору всіх активних ID
     */
    private function collectIds(array $items, array &$ids): void
    {
        foreach ($items as $item) {
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
    private function saveMenuItemsRecursive(array $items, int $menuId, ?int $parentId = null): void
    {
        foreach ($items as $index => $item) {
            $id = (isset($item['id']) && is_numeric($item['id']) && $item['id'] < 1000000000)
                ? $item['id']
                : null;

            $menuItem = MenuItem::updateOrCreate(
                ['id' => $id],
                [
                    'menu_id'    => $menuId,
                    'parent_id'  => $parentId,
                    'label'      => $item['label'],
                    'model_id'   => $item['model_id'] ?? null,
                    'model_type' => $item['model_type'] ?? null,
                    'url'        => $item['url'] ?? null,
                    'order'      => $index,
                ]
            );

            if (!empty($item['children'])) {
                $this->saveMenuItemsRecursive($item['children'], $menuId, $menuItem->id);
            }
        }
    }
}
