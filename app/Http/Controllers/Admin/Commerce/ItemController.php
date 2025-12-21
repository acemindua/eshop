<?php

namespace App\Http\Controllers\Admin\Commerce;

use App\Facades\Settings;
use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\ManufacturerResource;
use App\Models\Category;
use App\Models\Manufacturer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Rinvex\Country\CountryLoader;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ItemFilter $filter): Response
    {
        //
        Gate::authorize('viewAny', Item::class);
        //
        $items = Item::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page'))
            ->withQueryString();
        //
        return Inertia::render('Admin/Commerce/Items/Index', [
            'data' => [
                'items' => ItemResource::collection($items)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
        Gate::authorize('create', Item::class);
        //
        $nextOrder = (Item::max('order') ?? 0) + 1;

        $countries = collect(CountryLoader::countries())->map(function ($country) {
            return [
                'id'   => strtolower($country['iso_3166_1_alpha2']),
                'title' => $country['name'],
            ];
        })->sortBy('title')->values();

        return Inertia::render('Admin/Commerce/Items/Create', [
            'data' => [
                'categories' => CategoryResource::collection(
                    Category::query()
                        ->where('public', true)
                        ->get()
                ),
                'manufacturers' => ManufacturerResource::collection(
                    Manufacturer::query()
                        ->where('public', true)
                        ->get()
                ),
                'countries'     => $countries,
                'quantity'      => 0,
                'price'         => 0,
                'public'        => false,
                'order'         => $nextOrder
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request): RedirectResponse
    {
        //
        Gate::authorize('create', Item::class);

        $item = Item::create($request->validated());

        //
        return redirect()->route('admin.items.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Item  " . $item->title . "  successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item): Response
    {
        //
        Gate::authorize('view', $item);
        //
        return Inertia::render('Admin/Commerce/Items/Show', [
            'data' => [
                'item' => $item
            ],

        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item): Response
    {
        //
        Gate::authorize('update', $item);
        //

        $countries = collect(CountryLoader::countries())->map(function ($country) {
            return [
                'id'   => strtolower($country['iso_3166_1_alpha2']),
                'title' => $country['name'],
            ];
        })->sortBy('title')->values();

        return Inertia::render('Admin/Commerce/Items/Edit', [
            'data' => [
                'categories' => CategoryResource::collection(
                    Category::query()
                        ->select('id')
                        ->get()
                ),
                'manufacturers' => ManufacturerResource::collection(
                    Manufacturer::query()
                        ->where('public', true)
                        ->get()
                ),
                'countries'     => $countries,
                'item'          => $item
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item): RedirectResponse
    {
        //
        Gate::authorize('update', $item);
        //

        $item->fill($request->validated());
        $item->save();

        return redirect()->route('admin.items.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Item `" . $item->title . "` successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item): RedirectResponse
    {
        //
        Gate::authorize('update', $item);

        $item->clearMediaCollection('images');
        $item->delete();
        //
        return redirect()->route('admin.items.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Item successfully deleted!",
            ],
        ]);
    }
}
