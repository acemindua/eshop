<?php

namespace App\Http\Controllers\Admin;

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
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Pages/Index', [
            'data' => [
                'pages' => PageResource::collection($pages)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Pages/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request): RedirectResponse
    {
        return redirect()->route('admin.pages.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page): Response
    {
        return Inertia::render('Admin/Pages/Show', [
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page): Response
    {
        return Inertia::render('Admin/Pages/Edit', [
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        return redirect()->route('admin.pages.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page): RedirectResponse
    {
        return redirect()->route('admin.pages.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page successfully deleted!",
            ],
        ]);
    }
}
