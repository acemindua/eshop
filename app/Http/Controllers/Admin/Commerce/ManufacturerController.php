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
     * Display a filtered and paginated list of manufacturers.
     * Uses ManufacturerFilter for dynamic querying.
     */
    public function index(ManufacturerFilter $filter): Response
    {
        Gate::authorize('viewAny', Manufacturer::class);

        $manufacturers = Manufacturer::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page', 15))
            ->withQueryString();

        return Inertia::render('Admin/Commerce/Manufacturers/Index', [
            'data' => [
                'items' => ManufacturerResource::collection($manufacturers)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new manufacturer.
     */
    public function create(): Response
    {
        Gate::authorize('create', Manufacturer::class);

        return Inertia::render('Admin/Commerce/Manufacturers/Create', [
            'data' => [
                'nextOrder' => Manufacturer::max('order') + 1,
                'countries' => $this->getCountriesList(),
            ]
        ]);
    }

    /**
     * Store a newly created manufacturer and handle image upload.
     */
    public function store(StoreManufacturerRequest $request): RedirectResponse
    {
        Gate::authorize('create', Manufacturer::class);

        $manufacturer = Manufacturer::create($request->validated());

        if ($request->hasFile('image')) {
            $this->uploadImage($manufacturer, $request);
        }

        return redirect()->route('admin.manufacturers.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer `{$manufacturer->title}` successfully created!",
            ],
        ]);
    }

    /**
     * Display specific manufacturer details.
     */
    public function show(Manufacturer $manufacturer): Response
    {
        Gate::authorize('view', $manufacturer);

        return Inertia::render('Admin/Commerce/Manufacturers/Show', [
            'data' => [
                'manufacturer' => new ManufacturerResource($manufacturer)
            ],
        ]);
    }

    /**
     * Show the edit form with pre-populated manufacturer data and country list.
     */
    public function edit(Manufacturer $manufacturer): Response
    {
        Gate::authorize('update', $manufacturer);

        return Inertia::render('Admin/Commerce/Manufacturers/Edit', [
            'data' => [
                'manufacturer' => new ManufacturerResource($manufacturer),
                'countries'    => $this->getCountriesList(),
            ],
        ]);
    }

    /**
     * Update manufacturer details and refresh image if provided.
     */
    public function update(UpdateManufacturerRequest $request, Manufacturer $manufacturer): RedirectResponse
    {
        Gate::authorize('update', $manufacturer);

        $manufacturer->update($request->validated());

        if ($request->hasFile('image')) {
            $this->uploadImage($manufacturer, $request);
        }

        return redirect()->route('admin.manufacturers.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer `{$manufacturer->title}` successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the manufacturer and clean up associated media.
     */
    public function destroy(Manufacturer $manufacturer): RedirectResponse
    {
        Gate::authorize('delete', $manufacturer);

        // Best practice: Ensure media is cleared before record deletion
        $manufacturer->clearMediaCollection('images');
        $manufacturer->delete();

        return redirect()->route('admin.manufacturers.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer successfully deleted!",
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
     * Helper: Handle Media Library image uploads.
     */
    private function uploadImage(Manufacturer $manufacturer, $request): void
    {
        $filename = Str::slug($manufacturer->title) . '.' . $request->file('image')->getClientOriginalExtension();

        $manufacturer->clearMediaCollection('images');
        $manufacturer->addMediaFromRequest('image')
            ->setFileName($filename)
            ->toMediaCollection('images');
    }
}
