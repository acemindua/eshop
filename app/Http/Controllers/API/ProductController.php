<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $queryProductsActive = Product::query()->where('public', true)->orderBy('order')->with('variants');
        $queryProductsDeactive = Product::query()->where('public', false)->orderBy('order')->with('variants');

        $itemsNoVariants = (clone $queryProductsActive)->doesntHave('variants')->get();
        $itemsWithVariants = (clone $queryProductsActive)->has('variants')->get();

        $items = collect(); // Ініціалізація колекції

        // Додаємо товари без варіантів
        if ($itemsNoVariants->isNotEmpty()) {
            $items = $items->merge(
                ProductResource::collection($itemsNoVariants)->map(function ($item) {
                    return $item; // Використовуємо $item без toArray() для правильного форматування
                })
            );
        }

        // Додаємо товари з варіантами
        if (!empty($itemsWithVariants)) {
            foreach ($itemsWithVariants as $product) {
                if ($product['variants']->isNotEmpty()) {
                    foreach ($product['variants'] as $variant) {
                        $items->push(
                            [

                                'id'        => $variant->id,
                                'title'     => $product->title,
                                'price'     => $variant->price,
                                'quantity'  => $variant->quantity,
                                'slug'      => $product->slug,
                                'images'    => array_merge(
                                    $variant->sorted_images ?? [],
                                    $product->sorted_images ?? []
                                ),
                                'status'    => $variant->public ? true : false,
                            ]
                        );
                    }
                }
            }
        }

        $itemsNoVariants = (clone $queryProductsDeactive)->doesntHave('variants')->get();
        $itemsWithVariants = (clone $queryProductsDeactive)->has('variants')->get();

        // Додаємо товари без варіантів
        if ($itemsNoVariants->isNotEmpty()) {
            $items = $items->merge(
                ProductResource::collection($itemsNoVariants)->map(function ($item) {
                    return $item; // Використовуємо $item без toArray() для правильного форматування
                })
            );
        }

        // Додаємо товари з варіантами
        if (!empty($itemsWithVariants)) {
            foreach ($itemsWithVariants as $product) {
                if ($product['variants']->isNotEmpty()) {
                    foreach ($product['variants'] as $variant) {
                        $items->push(
                            [

                                'id'        => $variant->id,
                                'title'     => $product->title . " (" . $variant->attribute_value_title . ")",
                                'slug'      => $product->slug,
                                'images'    => $product->sorted_images,
                                'status'    => $product->public ? true : false,

                            ]
                        );
                    }
                }
            }
        }

        return response()->json($items);
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
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
