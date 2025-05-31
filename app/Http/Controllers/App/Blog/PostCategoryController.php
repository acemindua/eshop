<?php

namespace App\Http\Controllers\App\Blog;

use App\Http\Controllers\Controller;
use App\Models\PostCategory;
use App\Http\Requests\StorePostCategoryRequest;
use App\Http\Requests\UpdatePostCategoryRequest;
use App\Http\Resources\PostCategoryResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostCategoryController extends Controller
{
    /**
     * The number of items to display per page.
     *
     * @var int
     */
    public $pages;

    /**
     * Create a new controller instance.
     *
     * @param int|null $pages The number of items per page. Defaults to `settings.items_per_page` config value.
     */
    public function __construct(?int $pages = null)
    {
        $this->pages = $pages ?? (int) config('settings.items_per_page', 12);
    }

    /**
     * Display a listing of the post categories.
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', PostCategory::class);

        $items = PostCategory::query()
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate($this->pages)
            ->withQueryString();

        return Inertia::render(
            'App/Blog/PostCategories/Index',
            [
                'data' => [
                    'items' => PostCategoryResource::collection($items)
                ],
                'status'  => session('status'),
                'filters' => request()->only(['search', 'status']),
            ]
        );
    }

    /**
     * Show the form for creating a new post category.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        Gate::authorize('create', PostCategory::class);

        return Inertia::render(
            'App/Blog/PostCategories/Create',
            [
                'data' => [
                    'categories' => PostCategoryResource::collection(PostCategory::query()->orderBy('order', 'asc')->get()),
                ],
            ]
        );
    }

    /**
     * Store a newly created post category in storage.
     *
     * @param  \App\Http\Requests\StorePostCategoryRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StorePostCategoryRequest $request): RedirectResponse
    {
        Gate::authorize('create', PostCategory::class);

        $item = PostCategory::create($request->validated());

        return redirect()->route('admin.post-categories.edit', $item->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Post category successfully created!',
            ],
        ]);
    }

    /**
     * Display the specified post category.
     *
     * @param  \App\Models\PostCategory  $postCategory
     * @return \Inertia\Response
     */
    public function show(PostCategory $postCategory): Response
    {
        Gate::authorize('viewAny', PostCategory::class);

        return Inertia::render(
            'App/Blog/PostCategories/Show',
            [
                'data' => [
                    'item' => $postCategory
                ],
            ]
        );
    }

    /**
     * Show the form for editing the specified post category.
     *
     * @param  \App\Models\PostCategory  $postCategory
     * @return \Inertia\Response
     */
    public function edit(PostCategory $postCategory): Response
    {
        Gate::authorize('update', $postCategory);

        return Inertia::render(
            'App/Blog/PostCategories/Show',
            [
                'data' => [
                    'item' => $postCategory,
                    'categories' => PostCategoryResource::collection(PostCategory::query()->where('id', '!=', $postCategory->id)->orderBy('order', 'asc')->get()),
                ],
            ]
        );
    }

    /**
     * Update the specified post category in storage.
     *
     * @param  \App\Http\Requests\UpdatePostCategoryRequest  $request
     * @param  \App\Models\PostCategory  $postCategory
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdatePostCategoryRequest $request, PostCategory $postCategory): RedirectResponse
    {
        Gate::authorize('update', $postCategory);

        $postCategory->fill($request->validated());
        $postCategory->save();

        return redirect()->route('admin.post-categories.edit', $postCategory->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Post category successfully updated!',
            ],
        ]);
    }

    /**
     * Remove the specified post category from storage.
     *
     * @param  \App\Models\PostCategory  $postCategory
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(PostCategory $postCategory): RedirectResponse
    {
        Gate::authorize('delete', $postCategory);

        $postCategory->delete();

        return redirect()->route('admin.post-categories.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Post category successfully deleted!',
            ],
        ]);
    }
}
