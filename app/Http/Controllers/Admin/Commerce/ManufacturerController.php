<?php

namespace App\Http\Controllers\Admin\Commerce;

use App\Facades\Settings;
use App\Filters\ManufacturerFilter;
use App\Http\Controllers\Controller;
use App\Models\Manufacturer;
use App\Http\Requests\StoreManufacturerRequest;
use App\Http\Requests\UpdateManufacturerRequest;
use App\Http\Resources\ManufacturerResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Rinvex\Country\CountryLoader;
use Inertia\Inertia;
use Inertia\Response;

class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ManufacturerFilter $filter): Response
    {
        //
        Gate::authorize('viewAny', Manufacturer::class);
        //
        $manufacturers = Manufacturer::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page'))
            ->withQueryString();
        //
        return Inertia::render('Admin/Commerce/Manufacturers/Index', [
            'data' => [
                'items' => ManufacturerResource::collection($manufacturers)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Manufacturer::class);

        // Отримуємо наступний порядок
        $nextOrder = Manufacturer::max('order') + 1;

        // Завантажуємо країни через CountryLoader
        $countries = collect(CountryLoader::countries())->map(function ($country) {
            return [
                'id'   => strtolower($country['iso_3166_1_alpha2']),
                'title' => $country['name'],
            ];
        })->sortBy('title')->values();

        return Inertia::render('Admin/Commerce/Manufacturers/Create', [
            'data' => [
                'nextOrder' => $nextOrder,
                'countries' => $countries,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreManufacturerRequest $request): RedirectResponse
    {
        //
        Gate::authorize('create', Manufacturer::class);

        $manufacturer = Manufacturer::create($request->validated());

        if ($request->hasFile('image')) {
            $filename = Str::slug($manufacturer->title) . '.' . $request->file('image')->getClientOriginalExtension();
            $manufacturer->clearMediaCollection('images');
            $manufacturer->addMediaFromRequest('image')->setFileName($filename)->toMediaCollection('images');
        }

        //
        return redirect()->route('admin.manufacturers.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer `" . $manufacturer->title . "` successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Manufacturer $manufacturer): Response
    {
        //
        Gate::authorize('view', $manufacturer);
        //
        return Inertia::render('Admin/Commerce/Manufacturers/Show', [
            'data' => [
                'manufacturer' => $manufacturer
            ],

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Manufacturer $manufacturer): Response
    {
        //
        Gate::authorize('update', $manufacturer);

        $countries = collect(CountryLoader::countries())->map(function ($country) {
            return [
                'id'   => strtolower($country['iso_3166_1_alpha2']),
                'title' => $country['name'],
            ];
        })->sortBy('title')->values();
        //
        return Inertia::render('Admin/Commerce/Manufacturers/Edit', [
            'data' => [
                'manufacturer' => $manufacturer,
                'countries' => $countries,
            ],

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManufacturerRequest $request, Manufacturer $manufacturer): RedirectResponse
    {
        //
        Gate::authorize('update', $manufacturer);
        //

        $manufacturer->fill($request->validated());
        $manufacturer->save();

        if ($request->hasFile('image')) {
            $filename = Str::slug($manufacturer->title) . '.' . $request->file('image')->getClientOriginalExtension();
            $manufacturer->clearMediaCollection('images');
            $manufacturer->addMediaFromRequest('image')->setFileName($filename)->toMediaCollection('images');
        }

        return redirect()->route('admin.manufacturers.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer `" . $manufacturer->title . "`  successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manufacturer $manufacturer): RedirectResponse
    {
        //
        Gate::authorize('delete', $manufacturer);
        //
        $manufacturer->clearMediaCollection('images');
        $manufacturer->delete();

        return redirect()->route('admin.manufacturers.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer successfully deleted!",
            ],
        ]);
    }
}
