<?php

namespace App\Http\Controllers\App;

use App\Filters\PageFilter;
use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\PageResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{

    public $pages;

    function __construct(?int $pages = null)
    {
        $this->pages = $pages ?? (int) config('settings.items_per_page', 12);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(PageFilter $filter): Response
    {
        Gate::authorize('viewAny', Page::class);

        $items = Page::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate($this->pages)
            ->withQueryString();

        return Inertia::render(
            'App/Pages/Index',
            [
                'data' => [
                    'items' => PageResource::collection($items)
                ],
                'status'  => session('status'),
                'filters' => request()->only(['search', 'status']),
            ]

        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Page::class);
        
        return Inertia::render(
            'App/Pages/Create',
            [
                'data' => [],
                'status'  => session('status'),
            ]

        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request): RedirectResponse
    {
        Gate::authorize('create', Page::class);

        $item = Page::create($request->validated());

        return redirect()->route('admin.pages.edit', $item->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => "Product successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page) //: Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page): Response
    {
        Gate::authorize('update', Page::class);
        //
        return Inertia::render(
            'App/Pages/Edit',
            [
                'data' => [
                    'item' => $page
                ],
                'status'  => session('status'),
            ]

        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        //
        Gate::authorize('update', $page);

        $page->fill($request->validated());
        $page->save();

        return redirect()->route('admin.pages.edit', $page->id)->with([
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
        //
        Gate::authorize('delete', $page);
        if ($page->id === 1) {
            return redirect()->back()->with([
                'alert' => [
                    'type' => 'danger',
                    'message' => "Default Page dont deleted!",
                ],
            ]);
        }
        $page->delete();

        return redirect()->back()->with([
            'alert' => [
                'type' => 'success',
                'message' => "Page successfully deleted!",
            ],
        ]);
    }
}
