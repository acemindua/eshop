<?php

namespace App\Http\Controllers\Admin\Commerce\Settings;

use App\Facades\Settings;
use App\Filters\WarehousesFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Http\Resources\WarehouseResource;
use App\Models\Warehouse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseController extends Controller
{

    protected const DIRECTORY = 'Admin/Commerce/Settings/Warehouses';
    protected const ROUTE_PREFIX = 'admin.settings.commerce.warehouses';

    /**
     * Display a listing of the warehouses with filtering and pagination.
     */
    public function index(WarehousesFilter $filter): Response
    {
        Gate::authorize('viewAny', Warehouse::class);

        // Фільтр сам застосує потрібний orderBy, якщо параметри прилетять з фронтенду.
        // Залишаємо тільки дефолтний та пагінацію.
        $warehouses = Warehouse::filter($filter)
            ->paginate(Settings::get('items_per_page', 15))
            ->withQueryString();

        return Inertia::render(self::DIRECTORY . '/Index', [
            'data' => [
                'warehouses' => WarehouseResource::collection($warehouses)
            ],
            'filters' => request()->only(['search', 'active', 'field', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new warehouse.
     */
    public function create(): Response
    {
        Gate::authorize('create', Warehouse::class);

        return Inertia::render(self::DIRECTORY . '/Create', [
            'data' => [
                'defaults' => [
                    'sort_order' => (Warehouse::max('sort_order') ?? 0) + 1,
                    'is_active'  => true,
                ]
            ]
        ]);
    }

    /**
     * Store a newly created warehouse in storage.
     */
    public function store(StoreWarehouseRequest $request): RedirectResponse
    {
        Gate::authorize('create', Warehouse::class);

        $warehouse = Warehouse::create($request->validated());

        if ($request->hasFile('image')) {
            $warehouse->addMediaFromRequest('image')
                ->toMediaCollection('images');
        }

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Склад `{$warehouse->title}` успішно створено!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Warehouse $warehouse): Response
    {

        Gate::authorize('view', $warehouse);

        return Inertia::render(self::DIRECTORY . '/Show', [
            'data' => [
                'warehouse' => new WarehouseResource($warehouse),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified warehouse.
     */
    public function edit(Warehouse $warehouse): Response
    {
        Gate::authorize('update', $warehouse);

        return Inertia::render(self::DIRECTORY . '/Edit', [
            'data' => [
                'warehouse' => new WarehouseResource($warehouse),
            ],
        ]);
    }

    /**
     * Update the specified warehouse in storage.
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

        return redirect()->route('admin.settings.commerce.warehouses.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Warehouse `{$warehouse->title}` updated successfully!",
            ],
        ]);
    }

    /**
     * Toggle the active status of the specified warehouse.
     */
    public function toggle(Warehouse $warehouse): RedirectResponse
    {
        Gate::authorize('update', $warehouse);

        $warehouse->update(['is_active' => !$warehouse->is_active]);

        return redirect()->back()->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Warehouse `{$warehouse->title}` is now " . ($warehouse->is_active ? 'active' : 'inactive') . "!",
            ],
        ]);
    }

    /**
     * Remove the specified warehouse from storage.
     */
    public function destroy(Warehouse $warehouse): RedirectResponse
    {
        Gate::authorize('delete', $warehouse);

        $warehouse->clearMediaCollection('images');
        $warehouse->delete();

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Warehouse: `{$warehouse->title}` deleted successfully!",
            ],
        ]);
    }
}
