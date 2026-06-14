<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Models\Category;
use App\Models\Item;
use App\Models\Manufacturer;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class CommerceController extends Controller
{

    /**
     * 
     */
    protected const DIRECTORY = 'Public/Commerce';

    public function view(Item $item): Response
    {
        $seoService = new SeoService();

        return Inertia::render(self::DIRECTORY . '/View', [

            'data'   => [
                'locale' => app()->getLocale(),
                'item'   => new ItemResource($item),
            ],
            // SEO schema
            'seo'    => $seoService->generate($item),
            'schema' => $seoService->generateSchema($item),
        ]);
    }

    /**
     * 
     */
    public function category(Category $category): Response
    {
        $items = Item::all();

        $manufacturers = Manufacturer::where('public', true);

        $minPrice = $items->count() ? $items->min('price') : 0;
        $maxPrice = $items->count() ? $items->max('price') : 50000;

        return Inertia::render(self::DIRECTORY . '/Category', [
            'data' => [
                'locale'   => app()->getLocale(),
                'category' => new CategoryResource($category),
                'min_price' => (float) ($minPrice ?? 0),
                'max_price' => (float) ($maxPrice ?? 50000),
            ]
        ]);
    }
}
