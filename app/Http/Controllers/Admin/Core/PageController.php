<?php

namespace App\Http\Controllers\Admin\Core;

use App\Facades\Settings;
use App\Filters\PageFilter;
use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\PageResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{

    protected const DIRECTORY = 'Admin/Core/Pages';
    protected const ROUTE_PREFIX = 'admin.pages';
    /**
     * Display a listing of the resource.
     */
    public function index(PageFilter $filter): Response
    {
        Gate::authorize('viewAny', Page::class);

        $pages = Page::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page'))
            ->withQueryString();

        return Inertia::render(self::DIRECTORY . '/Index', [
            'data' => [
                'items' => PageResource::collection($pages)
            ],
            'filters' => request()->all(['search', 'field', 'direction']),
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Page::class);
        //
        $nextOrder = (Page::max('order') ?? 0) + 1;

        return Inertia::render(self::DIRECTORY . '/Create', [
            'data' => [
                'public' => false,
                'order' => $nextOrder
            ],
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request): RedirectResponse
    {
        Gate::authorize('create', Page::class);

        $page = Page::create($request->validated());

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page `" . $page->title . "`  successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page): Response
    {

        Gate::authorize('view', $page);

        return Inertia::render(self::DIRECTORY . '/Show', [
            'data' => [
                'page' => $page
            ],
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page): Response
    {
        Gate::authorize('update', $page);

        return Inertia::render(self::DIRECTORY . '/Edit', [
            'data' => [
                'page' => $page
            ],
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        Gate::authorize('update', $page);

        $page->fill($request->validated());
        $page->save();

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page `" . $page->title . "`  successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page): RedirectResponse
    {
        Gate::authorize('delete', $page);

        $page->delete();

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page successfully deleted!",
            ],
        ]);
    }
}
