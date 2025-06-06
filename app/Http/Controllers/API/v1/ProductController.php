<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Make sure this is imported if used elsewhere

class ProductController extends Controller
{
    /**
     * Display a listing of the products with pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        // 1. Get pagination parameters
        $perPage = $request->input('per_page', 12);
        $page = $request->input('page', 1);

        // 2. Determine category IDs
        $categoryIds = collect();
        if ($request->has('category_id')) {
            $categoryIds = $this->getAllCategoryIds($request->category_id);
        }

        // 3. Build the base product query
        $baseQuery = Product::query()
            ->when($categoryIds->isNotEmpty(), fn($q) => $q->whereIn('category_id', $categoryIds))
            ->orderBy('order')
            ->with([
                'variants.attribute_value', // Eager load variants and their attribute values
                'category', // Eager load category if needed in ProductResource
            ]);

        // 4. Handle public and inactive products
        $publicProductsQuery = (clone $baseQuery)->where('public', true);
        $allProductsQuery = $publicProductsQuery; // Start with public products

        if (Setting::getValue('show_inactive_products')) {
            // If inactive products should be shown, union them.
            // Ensure the columns selected in both queries are identical.
            // This assumes 'public' is a boolean or integer.
            $inactiveProductsQuery = (clone $baseQuery)->where('public', false);
            $allProductsQuery = $publicProductsQuery->unionAll($inactiveProductsQuery);
            // Note: `unionAll` might require `orderBy` to be applied after the union,
            // or for specific columns to be selected for consistency.
            // For complex `orderBy` on unioned results, you might wrap it in a subquery.
            // However, for simple `orderBy('order')` applied to both, it's often fine.
        }

        // 5. Paginate the combined query results
        // Use `->paginate()` for database-level pagination
        $paginatedProducts = $allProductsQuery->paginate($perPage, ['*'], 'page', $page);

        // 6. Format the paginated items using ProductResource and custom logic for variants
        $formattedItems = collect();
        foreach ($paginatedProducts->items() as $product) {
            if ($product->variants->isEmpty()) {
                // Products without variants can use ProductResource directly
                $formattedItems->push(
                    (new ProductResource($product))->toArray($request)
                );
            } else {
                // Products with variants need to be flattened
                foreach ($product->variants as $variant) {
                    $formattedItems->push([
                        'id' => $product->id,
                        'title' => $product->title . (optional($variant->attribute_value)->title ? ' / ' . $variant->attribute_value->title : ''),
                        'price' => $variant->price,
                        'quantity' => $variant->quantity,
                        'slug' => [
                            'product' => $product->slug,
                            'variant' => optional($variant->attribute_value)->slug,
                        ],
                        'category' => $product->category, // Assuming category is loaded via `with('category')`
                        'images' => array_merge($variant->sorted_images ?? [], $product->sorted_images ?? []),
                        'status' => (bool) $variant->public,
                        'reviews' => [
                            'average_rating' => $product->overallAverageRating(),
                            'reviews_count' => (int) $product->reviews()->approved()->count()
                        ],
                    ]);
                }
            }
        }

        // 7. Return the paginated JSON response
        return response()->json([
            'data' => $formattedItems->values()->all(), // The actual items for the current page
            'links' => [
                'first' => $paginatedProducts->url(1),
                'last' => $paginatedProducts->url($paginatedProducts->lastPage()),
                'prev' => $paginatedProducts->previousPageUrl(),
                'next' => $paginatedProducts->nextPageUrl(),
            ],
            'meta' => [
                'current_page' => $paginatedProducts->currentPage(),
                'from' => $paginatedProducts->firstItem(),
                'last_page' => $paginatedProducts->lastPage(),
                'path' => $paginatedProducts->path(),
                'per_page' => $paginatedProducts->perPage(),
                'to' => $paginatedProducts->lastItem(),
                'total' => $paginatedProducts->total(),
            ],
            // 'itemCount' is redundant here as it's part of meta.total, but kept for compatibility if needed.
            'itemCount' => $paginatedProducts->total(),
        ]);
    }

    /**
     * Recursively gets all category IDs including children.
     *
     * @param int $categoryId
     * @return \Illuminate\Support\Collection
     */
    public function getAllCategoryIds(int $categoryId): \Illuminate\Support\Collection
    {
        $categoryIds = collect([$categoryId]);

        $childrenIds = Category::where('category_id', $categoryId)->pluck('id');

        foreach ($childrenIds as $childId) {
            $categoryIds = $categoryIds->merge($this->getAllCategoryIds($childId));
        }

        return $categoryIds->unique();
    }
}
