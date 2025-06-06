<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommerceController extends Controller
{
    /**
     * Показ сторінки категорії товарів
     */
    public function showCategoryPage(string $slug): Response
    {
        $categorySlug = str_replace('category__', '', $slug);
        $category = Category::where('slug', $categorySlug)->firstOrFail();

        return Inertia::render('Main/Commerce/Category', compact(['category']));
    }
}
