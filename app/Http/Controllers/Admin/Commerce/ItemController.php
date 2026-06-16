<?php

namespace App\Http\Controllers\Admin\Commerce;

use App\Facades\Settings;
use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Category;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Models\Brand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Rinvex\Country\CountryLoader;

class ItemController extends Controller
{

    protected const DIRECTORY = 'Admin/Commerce/Items';
    protected const ROUTE_PREFIX = 'admin.commerce.items';

    /**
     * Display a listing of items with eager loading and filters.
     */
    public function index(ItemFilter $filter): Response
    {
        Gate::authorize('viewAny', Item::class);

        $items = Item::filter($filter)
            ->with(['category', 'brand'])
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page', 15))
            ->withQueryString();

        return Inertia::render(self::DIRECTORY . '/Index', [
            'data' => [
                'items' => ItemResource::collection($items)
            ],
            'filters' => request()->all(['search', 'status', 'field', 'direction']),
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for creating a new item.
     */
    public function create(): Response
    {
        Gate::authorize('create', Item::class);

        return Inertia::render(self::DIRECTORY . '/Create', [
            'data' => [
                'categories'    => CategoryResource::collection($this->getActiveCategories()),
                'brands'        => BrandResource::collection($this->getActiveBrands()),
                'countries'     => $this->getCountriesList(),
                'order'    => (Item::max('order') ?? 0) + 1,
                'quantity' => 0,
                'price'    => 0,
                'old_price'    => 0,
                'public'   => false,

            ],
            'routePrefix' => self::ROUTE_PREFIX,
            'isEditing' => false,
        ]);
    }

    /**
     * Store a newly created item.
     */
    public function store(StoreItemRequest $request): RedirectResponse
    {
        Gate::authorize('create', Item::class);

        $item = Item::create($request->validated());

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
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

        return Inertia::render(self::DIRECTORY . '/Show', [
            'data' => [
                'item' => new ItemResource($item->load(['category', 'manufacturer']))
            ],
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for editing the specified item.
     */
    public function edit(Item $item): Response
    {
        Gate::authorize('update', $item);

        return Inertia::render(self::DIRECTORY . '/Edit', [
            'data' => [
                'item'          => $item,
                'categories'    => CategoryResource::collection($this->getActiveCategories()),
                'brands'        => BrandResource::collection($this->getActiveBrands()),
                'countries'     => $this->getCountriesList(),
            ],
            'isEditing' => true,
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Update the item in storage.
     */
    public function update(UpdateItemRequest $request, Item $item): RedirectResponse
    {
        Gate::authorize('update', $item);

        $item->update($request->validated());

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
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

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
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

    private function getActiveBrands()
    {
        return Brand::where('public', true)->get(['id']);
    }

    private function getCountriesList(): array
    {
        return collect(CountryLoader::countries())->map(fn($country) => [
            'id'    => strtolower($country['iso_3166_1_alpha2']),
            'title' => $country['name'],
        ])->sortBy('title')->values()->toArray();
    }
}
