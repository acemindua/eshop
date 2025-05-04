<?php

namespace App\Http\Controllers\App\Commerce;

use App\Filters\ManufacturerFilter;
use App\Http\Controllers\Controller;
use App\Models\Manufacturer;
use App\Http\Requests\StoreManufacturerRequest;
use App\Http\Requests\UpdateManufacturerRequest;
use App\Http\Resources\ManufacturerResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
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

        $manufacturers = Manufacturer::query()->filter($filter)
            ->orderByDesc('public')
            ->orderBy('order')
            ->latest('updated_at')
            ->paginate(17)
            ->withQueryString();

        return Inertia::render(
            'App/Commerce/Manufacturers/Index',
            [
                'data' => [
                    'items' => ManufacturerResource::collection($manufacturers)
                ],
                'status'    => session('status'),
                'filters'   => request()->only(['search', 'status']),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
        Gate::authorize('create', Manufacturer::class);

        return Inertia::render(
            'App/Commerce/Manufacturers/Create',
            [
                'data' => []
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreManufacturerRequest $request): RedirectResponse
    {
        //
        Gate::authorize('create', Manufacturer::class);
        //
        $item = Manufacturer::create($request->validated());

        if ($request->hasFile('image')) {
            $filename = Str::slug($item->title) . '.' . $request->file('image')->getClientOriginalExtension();
            $item->addMediaFromRequest('image')->setFileName($filename)->toMediaCollection('images');
        }

        return redirect()->route('admin.manufacturers.edit',  $item->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Manufacturer $manufacturer): Response
    {
        Gate::authorize('view', $manufacturer);

        return Inertia::render(
            'App/Commerce/Manufacturers/Show',
            [
                'data' => []
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Manufacturer $manufacturer): Response
    {
        //
        Gate::authorize('update', $manufacturer);

        return Inertia::render(
            'App/Commerce/Manufacturers/Edit',
            [
                'data' => [
                    'item' => $manufacturer,
                    'users' => User::whereHas('roles', function ($query) {
                        $query->whereIn('name', ['admin', 'moder']);
                    })->get()
                ]
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateManufacturerRequest $request, Manufacturer $manufacturer): RedirectResponse
    {
        //
        Gate::authorize('update', $manufacturer);

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
                'message' => "Manufacturer successfully updated!",
            ],
        ]);
    }

    /**
     * Remove image from category without deleting the category itself.
     */
    public function destroyImage(Manufacturer $manufacturer): RedirectResponse
    {
        Gate::authorize('update', $manufacturer); // Або 'delete' — залежно від вашої логіки доступу

        // Видаляємо перше зображення з колекції 'images'
        $media = $manufacturer->getFirstMedia('images');
        if ($media) {
            $media->delete();
        }

        return redirect()->back()->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Image successfully deleted!',
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

        return redirect()->route('admin.manufacturers.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer successfully deleted!",
            ],
        ]);
    }
}
