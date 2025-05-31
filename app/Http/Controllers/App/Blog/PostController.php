<?php

namespace App\Http\Controllers\App\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostCategoryResource;
use App\Http\Resources\PostResource;
use App\Models\PostCategory;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
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
     * Display a listing of the posts.
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Post::class);

        $items = Post::query()
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate($this->pages)
            ->withQueryString();

        return Inertia::render(
            'App/Blog/Posts/Index',
            [
                'data' => [
                    'items' => PostResource::collection($items)
                ],
                'status'  => session('status'),
                'filters' => request()->only(['search', 'status']),
            ]
        );
    }

    /**
     * Show the form for creating a new post.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        Gate::authorize('create', Post::class);

        return Inertia::render(
            'App/Blog/Posts/Create',
            [
                'data' => [
                    'categories' => PostCategoryResource::collection(PostCategory::query()->orderBy('order', 'asc')->get()),
                ],
            ]
        );
    }

    /**
     * Store a newly created post in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        Gate::authorize('create', Post::class);

        $item = Post::create($request->validated());

        return redirect()->route('admin.posts.edit', $item->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Post successfully created!',
            ],
        ]);
    }

    /**
     * Display the specified post.
     *
     * @param  \App\Models\Post  $post
     * @return \Inertia\Response
     */
    public function show(Post $post): Response
    {
        Gate::authorize('viewAny', Post::class);

        return Inertia::render(
            'App/Blog/Posts/Show',
            [
                'data' => [
                    'item' => $post
                ],
            ]
        );
    }

    /**
     * Show the form for editing the specified post.
     *
     * @param  \App\Models\Post  $post
     * @return \Inertia\Response
     */
    public function edit(Post $post): Response
    {
        Gate::authorize('update', $post);

        return Inertia::render(
            'App/Blog/Posts/Edit',
            [
                'data' => [
                    'item' => $post,
                    'categories' => PostCategoryResource::collection(PostCategory::query()->orderBy('order', 'asc')->get()),
                ],
            ]
        );
    }

    /**
     * Update the specified post in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $post->fill($request->validated());
        $post->save();

        return redirect()->route('admin.posts.edit', $post->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Post successfully updated!',
            ],
        ]);
    }

    /**
     * Remove the specified post from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Post $post): RedirectResponse
    {
        Gate::authorize('delete', $post);

        $post->delete();

        return redirect()->route('admin.posts.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Post successfully deleted!',
            ],
        ]);
    }
}
