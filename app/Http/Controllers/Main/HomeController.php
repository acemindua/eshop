<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductVariantResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Web/Home', []);
    }

    /**
     * 
     */

    public function category(string $slug): Response
    {
        $category = Category::whereTranslation('slug', $slug)->with('products')->first();

        $queryProducts = Product::query()->where('public', true)->where('category_id', $category->id)->orderBy('order')->with('variants');

        $itemsNoVariants = (clone $queryProducts)->doesntHave('variants')->get();
        $itemsWithVariants = (clone $queryProducts)->has('variants')->get();

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

                        $items->push([
                            'data' => [
                                'id'        => $product->id,
                                'title'     => $product->title,
                                'slug'      => $variant->slug,
                                'sku'       => $variant->sku,
                                'price'     => $variant->price,
                                'quantity'  => $variant->quantity,
                                'images'    => $product->sorted_images,
                                'status'    => $variant->public ? true : false,
                            ]
                        ]);
                    }
                }
            }
        }
        return Inertia::render(
            'Main/Commerce/Category',
            [
                'data' => [
                    'item' => new CategoryResource($category),
                    'items' => $items,
                ],
            ]
        );
    }

    public function show(string $slug, ?string $variantSlug = null): Response
    {
        $product = Product::whereTranslation('slug', $slug)
            ->with(['variants.attribute_value'])
            ->firstOrFail();

        $variant = null;

        if ($variantSlug) {
            $variant = $product->variants
                ->first(function ($variant) use ($variantSlug) {
                    return optional($variant->attribute_value)->slug === $variantSlug;
                });
        }

        return Inertia::render('Main/Commerce/ProductShow', [
            'data' => [
                'item' => new ProductResource($product),
                'variant' => $variant ? new ProductVariantResource($variant) : null,
            ],
        ]);
    }
}
