<?php

namespace App\Services;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PageResource;
use App\Models\Category;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection; // For resource collection return type
use Illuminate\Support\Collection; // For standard collection return type (if not using resources)
use Darryldecode\Cart\Facades\CartFacade as Cart; // Import Cart facade for cart data

class SharedDataService
{
    /**
     * Retrieves and filters categories with active products or non-empty child categories.
     *
     * @return AnonymousResourceCollection
     */
    public static function getCategories(): AnonymousResourceCollection
    {
        $categories = Category::with('childs.products', 'products')->whereNull('category_id')->get();

        // Use a private helper method for recursive filtering
        $filteredCategories = self::filterCategoriesWithActiveProducts($categories);

        return CategoryResource::collection($filteredCategories);
    }

    /**
     * Recursively filters categories based on active products or non-empty child categories.
     *
     * @param Collection $categories
     * @return Collection
     */
    private static function filterCategoriesWithActiveProducts(Collection $categories): Collection
    {
        return $categories->filter(function ($category) {
            if ($category->childs->isNotEmpty()) {
                // Recursively filter child categories
                $category->childs = self::filterCategoriesWithActiveProducts($category->childs);
            }

            // Get the setting value once
            $showInactive = Setting::getValue('show_inactive_products');

            $hasProducts = $showInactive
                ? $category->products->isNotEmpty() // Check if there are any products
                : $category->products->where('public', true)->isNotEmpty(); // Check only public products

            // Category passes filter if it has relevant products OR has filtered child categories
            return $hasProducts || $category->childs->isNotEmpty();
        });
    }

    /**
     * Retrieves and formats public pages.
     *
     * @return AnonymousResourceCollection
     */
    public static function getPages(): AnonymousResourceCollection
    {
        return PageResource::collection(
            Page::where('public', true)->orderBy('order')->get()
        );
    }
}
