<?php

namespace App\Services;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PageResource;
use App\Models\Category;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Support\Collection;

class SharedDataService
{
    public static function getCategories() //: Collection
    {
        $categories = Category::with('childs', 'products')->whereNull('category_id')->get();

        $filter = function ($categories) use (&$filter) {
            return $categories->filter(function ($category) use (&$filter) {
                if ($category->childs->isNotEmpty()) {
                    $category->childs = $filter($category->childs);
                }

                $showInactive = Setting::getValue('show_inactive_products');

                $hasProducts = $showInactive
                    ? $category->products->isNotEmpty()
                    : $category->products->where('public', true)->isNotEmpty();

                return $hasProducts || $category->childs->isNotEmpty();
            });
        };

        return CategoryResource::collection($filter($categories));
    }

    public static function getPages() //: Collection
    {
        return PageResource::collection(
            Page::where('public', true)->orderBy('order')->get()
        );
    }
}
