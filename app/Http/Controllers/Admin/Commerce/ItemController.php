<?php

namespace App\Http\Controllers\Admin\Commerce;

use App\Facades\Settings;
use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Category;
use App\Models\Manufacturer;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\ManufacturerResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Rinvex\Country\CountryLoader;

class ItemController extends Controller
{
    /**
     * Display a listing of items with eager loading and filters.
     */
    public function index(ItemFilter $filter): Response
    {
        Gate::authorize('viewAny', Item::class);

        $items = Item::filter($filter)
            ->with(['category', 'manufacturer']) // Prevent N+1 on relationships
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page', 15))
            ->withQueryString();

        return Inertia::render('Admin/Commerce/Items/Index', [
            'data' => [
                'items' => ItemResource::collection($items)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new item.
     */
    public function create(): Response
    {
        Gate::authorize('create', Item::class);

        return Inertia::render('Admin/Commerce/Items/Create', [
            'data' => [
                'categories'    => CategoryResource::collection($this->getActiveCategories()),
                'manufacturers' => ManufacturerResource::collection($this->getActiveManufacturers()),
                'countries'     => $this->getCountriesList(),
                'defaults' => [
                    'order'    => (Item::max('order') ?? 0) + 1,
                    'quantity' => 0,
                    'price'    => 0,
                    'public'   => false,
                ]
            ],
        ]);
    }

    /**
     * Store a newly created item.
     */
    public function store(StoreItemRequest $request): RedirectResponse
    {
        Gate::authorize('create', Item::class);

        $item = Item::create($request->validated());

        return redirect()->route('admin.items.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Item `{$item->title}` successfully created!",
            ],
        ]);
    }

    /**
     * Display a specific item (using Resource for consistency).
     */
    public function show(Item $item): Response
    {
        Gate::authorize('view', $item);

        return Inertia::render('Admin/Commerce/Items/Show', [
            'data' => [
                'item' => new ItemResource($item->load(['category', 'manufacturer']))
            ],
        ]);
    }

    /**
     * Show the form for editing the specified item.
     */
    public function edit(Item $item): Response
    {
        Gate::authorize('update', $item);

        return Inertia::render('Admin/Commerce/Items/Edit', [
            'data' => [
                'item'          => $item,
                'categories'    => CategoryResource::collection($this->getActiveCategories()),
                'manufacturers' => ManufacturerResource::collection($this->getActiveManufacturers()),
                'countries'     => $this->getCountriesList(),
            ],
        ]);
    }

    /**
     * Update the item in storage.
     */
    public function update(UpdateItemRequest $request, Item $item): RedirectResponse
    {
        Gate::authorize('update', $item);

        $item->update($request->validated());

        return redirect()->route('admin.items.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Item `{$item->title}` successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the item and its media.
     */
    public function destroy(Item $item): RedirectResponse
    {
        Gate::authorize('delete', $item);

        $item->clearMediaCollection('images');
        $item->delete();

        return redirect()->route('admin.items.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Item successfully deleted!",
            ],
        ]);
    }

    // --- Private Helpers to keep code DRY ---

    private function getActiveCategories()
    {
        return Category::where('public', true)->get(['id']);
    }

    private function getActiveManufacturers()
    {
        return Manufacturer::where('public', true)->get(['id']);
    }

    private function getCountriesList(): array
    {
        return collect(CountryLoader::countries())->map(fn($country) => [
            'id'    => strtolower($country['iso_3166_1_alpha2']),
            'title' => $country['name'],
        ])->sortBy('title')->values()->toArray();
    }
}
