<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductVariantResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class HomeController extends Controller
{
    /**
     * 
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Main/Home', []);
    }

    /**
     * 
     */
    public function show(string $slug, ?string $variantSlug = null, ?string $optionSlug = null): Response
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

        return Inertia::render('Main/Commerce/Show', [
            'data' => [
                'item' => new ProductResource($product),
                'variant' => $variant ? new ProductVariantResource($variant) : null,
            ],
        ]);
    }

    /**
     * 
     */

    public function category(string $slug): Response
    {
        $category = Category::whereTranslation('slug', $slug)->first();

        return Inertia::render(
            'Main/Commerce/Category',
            [
                'data' => [
                    'item' => new CategoryResource($category),
                ],
            ]
        );
    }
}
