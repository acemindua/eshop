<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->category_id;

        // Якщо категорія вказана, отримуємо всі її підкатегорії (включно з нею)
        if ($categoryId) {
            $categoryIds = $this->getAllCategoryIds($categoryId);
        } else {
            $categoryIds = collect();
        }

        $items = collect();

        $addProducts = function ($public) use ($categoryIds, &$items) {
            $query = Product::query()
                ->where('public', $public)
                ->when($categoryIds->isNotEmpty(), fn($q) => $q->whereIn('category_id', $categoryIds))
                ->orderBy('order')
                ->with('variants');

            $itemsNoVariants = (clone $query)->doesntHave('variants')->get();
            $itemsWithVariants = (clone $query)->has('variants')->get();

            if ($itemsNoVariants->isNotEmpty()) {
                $items = $items->merge(
                    ProductResource::collection($itemsNoVariants)->map(fn($item) => $item)
                );
            }

            foreach ($itemsWithVariants as $product) {
                foreach ($product->variants as $variant) {
                    $items->push([
                        'id' => $variant->id,
                        'title' => $product->title . (optional($variant->attribute_value)->title ? ' / ' . $variant->attribute_value->title  : ''),
                        'price' => $variant->price,
                        'quantity' => $variant->quantity,
                        'slug' => [
                            'product' => $product->slug,
                            'variant' => optional($variant->attribute_value)->slug,
                        ],
                        'category' => $product->category,
                        'images' => array_merge($variant->sorted_images ?? [], $product->sorted_images ?? []),
                        'status' => (bool) $variant->public,
                    ]);
                }
            }
        };

        $addProducts(true);

        if (Setting::getValue('show_inactive_products')) {
            $addProducts(false);
        }

        return response()->json($items);
    }

    /**
     * 
     */
    public function getAllCategoryIds($categoryId)
    {
        $categoryIds = collect([$categoryId]);

        $childrenIds = Category::where('category_id', $categoryId)->pluck('id');

        foreach ($childrenIds as $childId) {
            $categoryIds = $categoryIds->merge($this->getAllCategoryIds($childId));
        }

        return $categoryIds->unique();
    }
}
