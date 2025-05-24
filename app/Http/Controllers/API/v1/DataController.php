<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PageResource;
use App\Models\Category;
use App\Models\Page;
use App\Models\Setting;
use Illuminate\Http\Request;

class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Витягуємо всі категорії верхнього рівня разом з дочірніми та продуктами
        $categories = Category::with('childs', 'products')->whereNull('category_id')->get();

        // Рекурсивна функція для фільтрації категорій з активними товарами або з непорожніми дочірніми категоріями
        $filterCategoriesWithActiveProducts = function ($categories) use (&$filterCategoriesWithActiveProducts) {
            return $categories->filter(function ($category) use (&$filterCategoriesWithActiveProducts) {

                // Фільтруємо дочірні категорії рекурсивно
                if ($category->childs->isNotEmpty()) {
                    $category->childs = $filterCategoriesWithActiveProducts($category->childs);
                }

                // Перевіряємо, чи є товари, які потрібно показувати
                $showInactive = Setting::getValue('show_inactive_products');

                if ($showInactive) {
                    // Якщо можна показувати неактивні, перевіряємо, чи є товари взагалі
                    $hasProducts = $category->products->isNotEmpty();
                } else {
                    // Інакше показуємо лише активні (public = true)
                    $hasProducts = $category->products->where('public', true)->isNotEmpty();
                }

                // Категорія проходить фільтр, якщо:
                // - Є товари, які треба показувати
                // АБО
                // - Є дочірні категорії після фільтрації (тобто непорожні)
                return $hasProducts || ($category->childs->isNotEmpty());
            });
        };

        // Фільтруємо дерево категорій
        $filteredCategories = $filterCategoriesWithActiveProducts($categories);


        // Pages 
        $pages = Page::where('public', true)->orderBy('order')->get();

        return response()->json([
            'categories' => CategoryResource::collection($filteredCategories),
            'pages' => PageResource::collection($pages),
        ]);
    }
}
