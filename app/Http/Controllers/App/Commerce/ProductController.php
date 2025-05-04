<?php

namespace App\Http\Controllers\App\Commerce;

use App\Filters\ProductFilter;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CountryResource;
use App\Http\Resources\ManufacturerResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Country;
use App\Models\Manufacturer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ProductFilter $filter): Response
    {
        Gate::authorize('viewAny', Product::class);

        $products = Product::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(14)
            ->withQueryString();

        return Inertia::render(
            'App/Commerce/Products/Index',
            [
                'data' => [
                    'items' => ProductResource::collection($products)
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
        Gate::authorize('create', Product::class);

        return Inertia::render(
            'App/Commerce/Products/Create',
            [
                'data' => [
                    'manufacturers' => ManufacturerResource::collection(Manufacturer::all()),
                    'categories' => CategoryResource::collection(Category::all()),
                    'countries' => CountryResource::collection(Country::all()),
                    'users' => User::whereHas('roles', function ($query) {
                        $query->whereIn('name', ['admin', 'moder']);
                    })->get()
                ]
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        Gate::authorize('create', Product::class);

        $item = Product::create($request->validated());

        return redirect()->route('admin.products.edit', $item->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => "Product successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        Gate::authorize('view', $product);
        return Inertia::render(
            'App/Commerce/Products/Show',
            [
                'data' => []
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        Gate::authorize('update', $product);

        return Inertia::render(
            'App/Commerce/Products/Edit',
            [
                'data' => [
                    'item' => $product,
                    'manufacturers' => ManufacturerResource::collection(Manufacturer::all()),
                    'categories' => CategoryResource::collection(Category::all()),
                    'countries' => CountryResource::collection(Country::all()),
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
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        Gate::authorize('update', $product);

        $product->fill($request->validated());
        $product->save();

        return redirect()->route('admin.products.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Product successfully updated!",
            ],
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        Gate::authorize('delete', $product);

        return redirect()->route('admin.products.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Product successfully deleted!",
            ],
        ]);
    }
}
