<?php

namespace App\Http\Controllers\App\Commerce;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use App\Http\Requests\StoreProductVariantRequest;
use App\Http\Requests\UpdateProductVariantRequest;
use App\Models\AttributeValue;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class ProductVariantController extends Controller
{

    function __construct(public int $pages = 15,  public array $data = []) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductVariantRequest $request): RedirectResponse
    {
        //product_id
        Gate::authorize('create', Product::class);

        // Отримуємо продукт
        $product = Product::findOrFail($request->product_id);

        // Отримуємо значення атрибута
        $attributeValue = AttributeValue::findOrFail($request->attribute_value_id);

        // Генеруємо slug
        $slug = Str::slug("{$product->slug}-{$attributeValue->title}");

        // Створюємо варіант продукту з `slug`
        ProductVariant::create(array_merge($request->validated(), ['slug' => $slug]));

        return redirect()->route('admin.products.edit', $request->product_id)->with([
            'alert' => [
                'type' => 'success',
                'message' => "Product Variant successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariant $productVariant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductVariant $productVariant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductVariantRequest $request, ProductVariant $productVariant)
    {
        //
        $productVariant->fill($request->validated());
        $productVariant->save();

        if ($request->hasFile('image')) {
            $filename = Str::slug($productVariant->title) . '.' . $request->file('image')->getClientOriginalExtension();
            $productVariant->clearMediaCollection('images');
            $productVariant->addMediaFromRequest('image')->setFileName($filename)->toMediaCollection('images');
        }

        return redirect()->route('admin.products.edit', $request->product_id)->with([
            'alert' => [
                'type' => 'success',
                'message' => "Manufacturer successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariant $productVariant)
    {
        //
    }
}
