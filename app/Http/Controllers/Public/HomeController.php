<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
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
    public function page(string $slug): Response
    {
        $page = Page::whereTranslation('slug', $slug)->firstOrFail();

        return Inertia::render('Public/Index', [
            'data' => [
                'locale' => app()->getLocale(),
                'page' => new PageResource($page) ?? null
            ]
        ]);
    }
}
