<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductVariantResource;
use App\Models\Attribute;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Знайдемо продукт
        $product = Product::with('variants.attribute')->find($request->product_id);

        // Перевірка, чи є продукт
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Отримуємо варіанти продукту, групуємо їх за атрибутами
        $variants = $product->variants
            ->groupBy('attribute_id')
            ->map(function ($variantGroup, $attributeId) use ($product) {
                // Отримуємо атрибут без окремих запитів для кожного
                $attribute = $product->variants->firstWhere('attribute_id', $attributeId)->attribute;

                return [
                    'id' => $attribute->id,
                    'title' => $attribute->title,
                    'slug' => $attribute->slug,
                    'values' => $variantGroup->map(function ($variant) {
                        return new ProductVariantResource($variant);
                    })->values()->toArray(),
                ];
            })->values()->toArray();

        return response()->json($variants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariant $productVariant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductVariant $productVariant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariant $productVariant)
    {
        //
    }
}
