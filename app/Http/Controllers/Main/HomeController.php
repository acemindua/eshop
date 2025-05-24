<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PageResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductVariantResource;
use App\Models\Category;
use App\Models\Page;
use App\Models\Product;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Головна сторінка сайту
     */
    public function index(SeoService $seoService): Response
    {
        $page = Page::whereTranslation('slug', 'home')->firstOrFail();

        // Якщо хочеш передати ресурс у вигляді масиву (зазвичай PageResource очікує модель або колекцію)
        $seo = $seoService->generate(new PageResource($page));

        return Inertia::render('Main/Home', compact('seo'));
    }

    /**
     * Єдиний обробник маршрутів — визначає, що показувати за URL
     */
    /**
     * Єдиний обробник маршрутів — визначає, що показувати за URL
     */
    public function resolveDynamicRoute(string $slug, ?string $optional = null) //: Response
    {
        // Пошук товару
        $product = Product::whereTranslation('slug', $slug)->first();
        if ($product) {
            return $this->showProductPage($slug, $optional);
        }

        // Пошук сторінки
        $page = Page::whereTranslation('slug', $slug)->first();
        if ($page) {
            return $this->showStaticPage($slug);
        }


        // Якщо нічого не знайдено — 404
        abort(404);
    }


    /**
     * Показ однієї статичної сторінки (наприклад: "Про нас")
     */
    public function showStaticPage(Request|string $requestOrSlug, ?string $slug = null): Response
    {
        $slug = is_string($requestOrSlug) ? $requestOrSlug : $slug;
        $page = Page::whereTranslation('slug', $slug)->first();

        if (!$page) abort(404);

        return Inertia::render('Main/Page', [
            'data' => [
                'item' => new PageResource($page),
            ],
        ]);
    }

    /**
     * Показ сторінки товару з опціональним варіантом
     */
    public function showProductPage(string $slug, ?string $variantSlug = null): Response
    {
        $product = Product::whereTranslation('slug', $slug)
            ->with(['variants.attribute_value'])
            ->firstOrFail();

        $variant = null;

        if ($variantSlug) {
            $variant = $product->variants
                ->first(fn($v) => optional($v->attribute_value)->slug === $variantSlug);
        }

        return Inertia::render('Main/Commerce/Show', [
            'data' => [
                'item' => new ProductResource($product),
                'variant' => $variant ? new ProductVariantResource($variant) : null,
            ],
        ]);
    }

    /**
     * Показ сторінки категорії товарів
     */
    public function showCategoryPage(string $slug): Response
    {
        $categorySlug = str_replace('category__', '', $slug);
        $category = Category::whereTranslation('slug', $categorySlug)->firstOrFail();

        return Inertia::render('Main/Commerce/Category', [
            'data' => [
                'item' => new CategoryResource($category),
            ],
        ]);
    }
}
