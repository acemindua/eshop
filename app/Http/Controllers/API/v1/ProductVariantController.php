<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductVariantRequest;
use App\Http\Resources\ProductVariantResource;
use App\Models\Product;
use App\Models\ProductVariant;
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
        $product = Product::with('variants')->find($request->product_id);

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

        try {
            // Створення самого варіанту продукту
            $productVariant = ProductVariant::create($validated);

            DB::commit();

            return response()->json([
                'message' => 'Product variant created successfully.',
                'data'    => $productVariant, // якщо потрібен зв'язок одразу
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
        try {
            $data = $request->all();
            $data['public'] = filter_var($data['public'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
            $productVariant->fill($data);
            $productVariant->save();

            return response()->json([
                'message' => 'Product variant updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update Product variant.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariant $productVariant)
    {
        try {
            $productVariant->clearMediaCollection('images');
            $productVariant->delete();

            return response()->json([
                'message' => 'Product variant variant deleted successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete product variant.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
