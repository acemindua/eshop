<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributeResource;
use App\Http\Resources\AttributeValueResource;
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
        $page = Page::find(1);

        $seo = $seoService->generate(new PageResource($page));
        $about = Page::where('slug', 'about')->get();

        return Inertia::render('Main/Home', [
            'data' => [
                'seo'   => $seo,
                //'about' => $about ? new PageResource($about) : null
            ]
        ]);
    }

    /**
     * Search сторінка сайту
     */
    public function search(Request $request): Response
    {
        $page = Page::find(1);
        $seo = [
            'title'         => __('Search result for your query') . ": " . $request->q,
            'description'   =>  $page ? $page->description : ""
        ];

        return Inertia::render('Main/Search', [
            'data' => [
                'seo'   => $seo,
            ],
            'filters'   => request()->only(['q', 'status']),
        ]);
    }

    /**
     * Єдиний обробник маршрутів — визначає, що показувати за URL
     */
    public function resolveDynamicRoute(string $slug, ?string $optional = null) //: Response
    {
        // Пошук товару
        $product = Product::where('slug', $slug)->first();
        if ($product) {
            return $this->showProductPage($slug, $optional);
        }

        // Пошук сторінки
        $page = Page::where('slug', $slug)->first();
        if ($page) {
            return $this->showStaticPage($page);
        }


        // Якщо нічого не знайдено — 404
        abort(404);
    }


    /**
     * Показ однієї статичної сторінки (наприклад: "Про нас")
     */
    public function showStaticPage(Page  $page): Response
    {
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
        // Product
        $product = Product::where('slug', $slug)->firstOrFail();

        // Attempt to find the selected variant by its attribute value slug
        $variant = null;

        if ($variantSlug) {
            $variant = $product->variants
                ->first(fn($v) => optional($v->attribute_value)->slug === $variantSlug);

            // Append the variant attribute value to the product title if found
            if ($variant) {
                $product->title .= ' / ' . optional($variant->attribute_value)->title;
                $product->sku =  $variant->sku;
                $product->price = $variant->price;
                $product->quantity = $variant->quantity;
                $product->meta_title .= ' / ' . optional($variant->attribute_value)->title;
            }
        }
        // Merge variant images with product images (variant first)
        $images = array_merge($variant->sorted_images ?? [], $product->sorted_images ?? []);

        // Render the product page via Inertia with all necessary data
        return Inertia::render('Main/Commerce/ProductDetails', [
            'data' => [
                'item' => new ProductResource($product),
                'variant' => $variant ? new ProductVariantResource($variant) : null,
                'images' => $images,
                //'attributes' => $attributes,
            ],
        ]);
    }


    /**
     * Показ сторінки категорії товарів
     */
    public function showCategoryPage(string $slug): Response
    {
        $categorySlug = str_replace('category__', '', $slug);
        $category = Category::where('slug', $categorySlug)->firstOrFail();

        return Inertia::render('Main/Commerce/Category', [
            'data' => [
                'item' => new CategoryResource($category),
            ],
        ]);
    }
}
