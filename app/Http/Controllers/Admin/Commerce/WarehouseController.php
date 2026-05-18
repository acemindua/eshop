<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Facades\Settings;
use App\Filters\WarehousesFilter;
use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Http\Resources\WarehouseResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseController extends Controller
{
    /**
     * Список складів з фільтрацією та пагінацією.
     */
    public function index(WarehousesFilter $filter): Response
    {
        Gate::authorize('viewAny', Warehouse::class);

        $warehouses = Warehouse::filter($filter)
            ->orderBy('sort_order', 'asc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page', 15))
            ->withQueryString();

        return Inertia::render('Admin/Settings/Warehouses/Index', [
            'data' => [
                'warehouses' => WarehouseResource::collection($warehouses)
            ],
            'filters' => request()->only(['search', 'active']),
        ]);
    }

    /**
     * Форма створення.
     */
    public function create(): Response
    {
        Gate::authorize('create', Warehouse::class);

        return Inertia::render('Admin/Settings/Warehouses/Create', [
            'data' => [
                'defaults' => [
                    'sort_order' => (Warehouse::max('sort_order') ?? 0) + 1,
                    'is_active'  => true,
                ]
            ]
        ]);
    }

    /**
     * Збереження складу.
     */
    public function store(StoreWarehouseRequest $request): RedirectResponse
    {
        Gate::authorize('create', Warehouse::class);

        $warehouse = Warehouse::create($request->validated());

        if ($request->hasFile('image')) {
            $warehouse->addMediaFromRequest('image')
                ->toMediaCollection('images');
        }

        return redirect()->route('admin.settings.warehouses.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Склад `{$warehouse->title}` успішно створено!",
            ],
        ]);
    }

    /**
     * Форма редагування.
     */
    public function edit(Warehouse $warehouse): Response
    {
        Gate::authorize('update', $warehouse);

        return Inertia::render('Admin/Settings/Warehouses/Edit', [
            'data' => [
                'warehouse' => new WarehouseResource($warehouse),
            ],
        ]);
    }

    /**
     * Оновлення складу.
     */
    public function update(UpdateWarehouseRequest $request, Warehouse $warehouse): RedirectResponse
    {
        Gate::authorize('update', $warehouse);

        $warehouse->update($request->validated());

        if ($request->hasFile('image')) {
            $warehouse->clearMediaCollection('images');
            $warehouse->addMediaFromRequest('image')
                ->toMediaCollection('images');
        }

        return redirect()->route('admin.settings.warehouses.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Дані складу `{$warehouse->title}` оновлено!",
            ],
        ]);
    }

    /**
     * Перемикання статусу (Toggle).
     */
    public function toggle(Warehouse $warehouse): RedirectResponse
    {
        Gate::authorize('update', $warehouse);

        $warehouse->update(['is_active' => !$warehouse->is_active]);

        return redirect()->back()->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Статус складу змінено!",
            ],
        ]);
    }

    /**
     * Видалення складу.
     */
    public function destroy(Warehouse $warehouse): RedirectResponse
    {
        Gate::authorize('delete', $warehouse);

        $warehouse->clearMediaCollection('images');
        $warehouse->delete();

        return redirect()->route('admin.settings.warehouses.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Склад успішно видалено!",
            ],
        ]);
    }
}
