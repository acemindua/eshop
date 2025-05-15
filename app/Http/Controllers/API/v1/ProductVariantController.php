<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductVariantRequest;
use App\Http\Resources\ProductVariantResource;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVariantValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // Знайдемо продукт
        $product = Product::with('variants.values')->find($request->product_id);

        // Перевірка, чи є продукт
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(ProductVariantResource::collection($product->variants));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductVariantRequest $request)
    {
        $validated = $request->validated();

        // Використання транзакції для цілісності даних
        DB::beginTransaction();

        try {
            // Створення самого варіанту продукту
            $productVariant = ProductVariant::create($validated);

            // Збереження зв'язку атрибута з варіантом
            ProductVariantValue::create([
                'product_variant_id'   => $productVariant->id,
                'attribute_id'         => $validated['attribute_id'],
                'attribute_value_id'   => $validated['attribute_value_id'],
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Product variant created successfully.',
                'data'    => $productVariant->fresh('values'), // якщо потрібен зв'язок одразу
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create product variant.',
                'error'   => $e->getMessage(),
            ], 500);
        }
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
