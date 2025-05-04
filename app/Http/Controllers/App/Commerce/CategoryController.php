<?php

namespace App\Http\Controllers\App\Commerce;

use App\Filters\CategoryFilter;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CategoryFilter $filter): Response
    {
        Gate::authorize('viewAny', Category::class);

        $categories = Category::filter($filter)
            ->orderByDesc('public')
            ->latest('updated_at')
            ->paginate(17)
            ->withQueryString();

        return Inertia::render('App/Commerce/Categories/Index', [
            'data' => [
                'items' => CategoryResource::collection($categories)
            ],
            'status'    => session('status'),
            'filters'   => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
        Gate::authorize('create', Category::class);

        $categories = CategoryResource::collection((Category::query()->orderBy('order', 'asc')->get()));

        return Inertia::render(
            'App/Commerce/Categories/Create',
            [
                'data' => [
                    'categories' => $categories
                ]
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        //
        Gate::authorize('create', Category::class);

        $item = Category::create($request->validated());

        if ($request->hasFile('image')) {
            $filename = Str::slug($item->title) . '.' . $request->file('image')->getClientOriginalExtension();
            $item->addMediaFromRequest('image')->setFileName($filename)->toMediaCollection('images');
        }

        return redirect()->route('admin.categories.edit',  $item->id)->with([
            'alert' => [
                'type' => 'success',
                'message' => "Category successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): Response
    {
        Gate::authorize('view', $category);

        return Inertia::render(
            'App/Commerce/Categories/Show',
            [
                'data' => []
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category): Response
    {
        Gate::authorize('update', $category);

        return Inertia::render(
            'App/Commerce/Categories/Edit',
            [
                'data' => [
                    'item' => $category,
                    'categories' => CategoryResource::collection((Category::query()->where('id', '!=', $category->id)->orderBy('order', 'asc')->get())),
                    'users' => User::whereHas('roles', function ($query) {
                        $query->whereIn('name', ['admin', 'moder']);
                    })->get()
                ]
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        Gate::authorize('update', $category);

        $category->fill($request->validated());
        $category->save();

        if ($request->hasFile('image')) {
            $filename = Str::slug($category->title) . '.' . $request->file('image')->getClientOriginalExtension();
            $category->clearMediaCollection('images');
            $category->addMediaFromRequest('image')->setFileName($filename)->toMediaCollection('images');
        }

        return redirect()->route('admin.categories.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Category successfully updated!",
            ],
        ]);
    }

    /**
     * Remove image from category without deleting the category itself.
     */
    public function destroyImage(Category $category): RedirectResponse
    {
        Gate::authorize('update', $category); // Або 'delete' — залежно від вашої логіки доступу

        // Видаляємо перше зображення з колекції 'images'
        $media = $category->getFirstMedia('images');
        if ($media) {
            $media->delete();
        }

        return redirect()->back()->with([
            'alert' => [
                'type' => 'success',
                'message' => 'Image successfully deleted!',
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        Gate::authorize('delete', $category);

        return redirect()->route('admin.categories.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Category successfully deleted!",
            ],
        ]);
    }
}
