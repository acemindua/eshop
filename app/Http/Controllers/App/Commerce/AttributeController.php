<?php

namespace App\Http\Controllers\App\Commerce;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Http\Requests\StoreAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Product::class);

        $attributes = Attribute::orderByDesc('order')
            ->paginate(17)
            ->withQueryString();

        return Inertia::render('App/Commerce/Attributes/Index', [
            'data' => [
                'items' => AttributeResource::collection($attributes)
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render(
            'App/Commerce/Attributes/Create',
            [
                'data' => []
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttributeRequest $request): RedirectResponse
    {
        Attribute::create($request->validated());

        return redirect()->route('admin.attributes.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Product Attribute successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attribute $attribute): Response
    {
        Gate::authorize('view', $attribute);

        return Inertia::render(
            'App/Commerce/Attributes/Show',
            [
                'data' => []
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attribute $attribute): Response
    {
        Gate::authorize('update', $attribute);

        return Inertia::render(
            'App/Commerce/Attributes/Edit',
            [
                'data' => [
                    'item' =>  $attribute
                ]
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttributeRequest $request, Attribute $attribute): RedirectResponse
    {
        Gate::authorize('update', $attribute);

        $attribute->fill($request->validated());
        $attribute->save();

        return redirect()->route('admin.attributes.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Attribute successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attribute $attribute)
    {
        Gate::authorize('delete', $attribute);
    }
}
