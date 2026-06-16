<?php

namespace App\Http\Controllers\Admin\Commerce;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Facades\Settings;
use App\Filters\BrandFilter;
use App\Http\Resources\BrandResource;
use App\Http\Resources\ManufacturerResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Rinvex\Country\CountryLoader;
use Inertia\Inertia;
use Inertia\Response;


class BrandController extends Controller
{

    protected const DIRECTORY = 'Admin/Commerce/Brands';
    protected const ROUTE_PREFIX = 'admin.commerce.brands';

    /**
     * Display a listing of the resource.
     */
    public function index(BrandFilter $filter): Response
    {
        Gate::authorize('viewAny', Brand::class);

        $brands = Brand::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page', 15))
            ->withQueryString();

        return Inertia::render(self::DIRECTORY . '/Index', [
            'data' => [
                'brands' => BrandResource::collection($brands)
            ],
            'filters' => request()->only(['search', 'status']),
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Brand::class);

        return Inertia::render(self::DIRECTORY . '/Create', [
            'data' => [
                'order'      => (Brand::max('order') ?? 0) + 1,
                'countries' => $this->getCountriesList(),
            ],
            'routePrefix' => self::ROUTE_PREFIX,
            'isEditing' => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request): RedirectResponse
    {
        Gate::authorize('create', Brand::class);

        $manufacturer = Brand::create($request->validated());

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer `{$manufacturer->title}` successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand): Response
    {
        Gate::authorize('view', $brand);

        return Inertia::render(self::DIRECTORY . '/Show', [
            'data' => [
                'manufacturer' => new BrandResource($brand)
            ],
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand): Response
    {
        Gate::authorize('update', $brand);

        return Inertia::render(self::DIRECTORY . '/Edit', [
            'data' => [
                'brand'         => $brand,
                'countries'    => $this->getCountriesList(),
            ],
            'routePrefix' => self::ROUTE_PREFIX,
            'isEditing' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand): RedirectResponse
    {
        Gate::authorize('update', $brand);

        $brand->update($request->validated());

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Brand `{$brand->title}` successfully updated!",
            ],
        ]);
    }

    /**
     * Helper: Fetch and format countries list for dropdowns.
     */
    private function getCountriesList(): array
    {
        return collect(CountryLoader::countries())->map(fn($country) => [
            'id'    => strtolower($country['iso_3166_1_alpha2']),
            'title' => $country['name'],
        ])->sortBy('title')->values()->toArray();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand): RedirectResponse
    {
        Gate::authorize('delete', $brand);

        // Best practice: Ensure media is cleared before record deletion
        $brand->clearMediaCollection('images');
        $brand->delete();

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Brand successfully deleted!",
            ],
        ]);
    }
}
