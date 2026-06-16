<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Models\Category;
use App\Models\Item;
use App\Services\SeoService;
use Inertia\Inertia;
use Inertia\Response;


class CommerceController extends Controller
{

    protected SeoService $seoService;

    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    /**
     * Product page
     */
    protected const DIRECTORY = 'Public/Commerce';

    public function view(Item $item): Response
    {
        return Inertia::render(self::DIRECTORY . '/View', [

            'data'   => [
                'locale' => app()->getLocale(),
                'item'   => new ItemResource($item),
            ],
            // SEO 
            'seo'    => $this->seoService->generate($item),
            'schema' => $this->seoService->generateSchema($item),
        ]);
    }

    /**
     * Category page
     */
    public function category(Category $category): Response
    {
        $allIds = $category->getAllChildrenIds();

        // Використовуємо ->max('price') прямо в запиті
        $maxPrice = Item::query()
            ->whereIn('category_id', $allIds)
            ->max('price');

        return Inertia::render(self::DIRECTORY . '/Category', [
            'data' => [
                'locale'        => app()->getLocale(),
                'category'      => new CategoryResource($category),
                'price_max'     => (float) $maxPrice ?? 500000,
            ],
            // SEO
            'seo'    => $this->seoService->generate($category),
            'schema' => $this->seoService->generateSchema($category),
        ]);
    }
}
