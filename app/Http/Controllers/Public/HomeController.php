<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\PageResource;
use App\Models\Category;
use App\Models\Item;
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
        return Inertia::render('Public/Index', [
            'data' => [
                'locale' => app()->getLocale()
            ]
        ]);
    }

    /**
     * 
     */
    public function resolveDynamicRoute(string $slug, ?string $optional = null)
    {
        //
        $item = Item::whereTranslation('slug', $slug)->first();
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

        return Inertia::render('Public/Commerce/ItemShow', [
            'data' => [
                'locale' => app()->getLocale(),
                'item' => new ItemResource($item) ?? null
            ]
        ]);
    }

    /**
     * 
     */
    public function categoryShow(string $slug): Response
    {
        $categorySlug = str_replace('category__', '', $slug);
        $category = Category::query()
            ->select('id')
            ->with([
                'items' => function ($query) {
                    $query->where('public', true);
                },
                'childs' => function ($query) {
                    $query->where('public', true);
                }
            ])
            ->whereTranslation('slug', $categorySlug)
            ->firstOrFail();

        return Inertia::render('Public/Commerce/CategoryShow', [
            'data' => [
                'locale'        => app()->getLocale(),
                'category'    => new CategoryResource($category) ?? null
            ]
        ]);
    }
}
