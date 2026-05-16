<?php

namespace App\Http\Controllers\Admin\Dashboard;

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

        return Inertia::render('Admin/Dashboard/Pages/Index', [
            'data' => [
                'pages' => PageResource::collection($pages)
            ],
            'filters' => request()->all(['search', 'field', 'direction']),
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

        return Inertia::render('Admin/Dashboard/Pages/Form', [
            'data' => [
                'public' => false,
                'order' => $nextOrder
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request): RedirectResponse
    {
        Gate::authorize('create', Page::class);

        $page = Page::create($request->validated());

        return redirect()->route('admin.pages.index')->with([
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

        return Inertia::render('Admin/Dashboard/Pages/Show', [
            'data' => [
                'page' => $page
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page): Response
    {
        Gate::authorize('update', $page);

        return Inertia::render('Admin/Dashboard/Pages/Form', [
            'data' => [
                'page' => $page
            ],
            'status' => session('status'),
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

        return redirect()->route('admin.pages.index')->with([
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

        return redirect()->route('admin.pages.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page successfully deleted!",
            ],
        ]);
    }
}
