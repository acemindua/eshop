<?php

namespace App\Http\Controllers\Public;

use App\Facades\Settings;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\PageResource;
use App\Models\Category;
use App\Models\Item;
use App\Models\Manufacturer;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class HomeController extends Controller
{
    /**
     * 
     */
    public function index(): Response
    {

        $products = Item::where('public', true)
            ->withCount('ratings')
            ->withAvg('ratings as average_rating', 'value')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Public/Home', [
            'products' => ItemResource::collection($products)
        ]);

        $products = Item::where('public', true)->latest()->take(10)->get();
        $settings =  Settings::all();

        $page = collect([
            'title'       => $settings['site_name'] ?? config('app.name'),
            'description' => $settings['site_tagline'] ?? '',
        ]);

        return Inertia::render('Public/Home', [
            'seo'      => (new \App\Services\SeoService())->generate($page),
            'products' => ItemResource::collection($products), // Ось тут товари
            'filters'  => ['sort' => 'newest', 'q' => ''],
            'data'     => ['locale' => app()->getLocale()]
        ]);
    }

    /**
     * 
     */
    public function search(Request $request): Response
    {
        return Inertia::render('Public/Search', [
            'data' => [
                'locale' => app()->getLocale(),

            ],
            'filters' => $request->only(['q']),
        ]);
    }

    /**
     * 
     */
    public function resolveDynamicRoute(string $slug, ?string $optional = null)
    {
        //
        $item = Item::whereTranslation('slug', $slug)
            ->withCount('ratings')
            ->withAvg('ratings as average_rating', 'value')
            ->first();
        if ($item) {
            return $this->itemShow($item);
        }

        // Page
        $page = Page::whereTranslation('slug', $slug)->first();
        if ($page) {
            return $this->pageShow($page);
        }

        // Якщо нічого не знайдено — 404
        abort(404);
    }

    /**
     * 
     */
    public function pageShow(Page $page): Response
    {
        if (!$page) abort(404);

        return Inertia::render('Public/PageShow', [
            'data' => [
                'locale' => app()->getLocale(),
                'page' => new PageResource($page) ?? null
            ]
        ]);
    }

    /**
     * 
     */
    public function itemShow(Item $item): Response
    {
        if (!$item) abort(404);

        return Inertia::render('Public/Commerce/View', [
            'seo'       => (new \App\Services\SeoService())->generate($item),
            'schema'    => (new \App\Services\SeoService())->generateSchema($item),
            'data' => [
                'locale' => app()->getLocale(),
                'item' => new ItemResource($item) ?? null
            ]
        ]);
    }

    /**
     * 
     */
    public function categoryShow(Request $request, string $slug): Response
    {
        $categorySlug = str_replace('category__', '', $slug);
        $category = Category::whereTranslation('slug', $categorySlug)->firstOrFail();

        $itemsQuery = Item::query()
            ->where('category_id', $category->id)
            ->where('public', true)
            ->filter(new \App\Filters\ItemFilter($request));

        // Сортування (ВАЖЛИВО: перед пагінацією)
        $sort = $request->input('sort', 'newest');
        $itemsQuery = match ($sort) {
            'price_asc'  => $itemsQuery->orderBy('price', 'asc'),
            'price_desc' => $itemsQuery->orderBy('price', 'desc'),
            default      => $itemsQuery->latest(),
        };

        // Отримуємо дані
        $items = $itemsQuery->with(['translations', 'media'])
            ->paginate(12)
            ->withQueryString();

        $manufacturers = Manufacturer::whereHas('items', function ($q) use ($category) {
            $q->where('category_id', $category->id);
        })->get(['id', 'title']);

        return Inertia::render('Public/Commerce/CategoryShow', [
            'data' => [
                'locale'   => app()->getLocale(),
                'category' => new CategoryResource($category),
                'items'    => ItemResource::collection($items),
                'available_manufacturers' => $manufacturers,
            ],
            'filters' => $request->all(['min_price', 'max_price', 'manufacturers', 'q', 'sort']),
        ]);
    }
}
