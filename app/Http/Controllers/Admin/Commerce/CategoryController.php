<?php

namespace App\Http\Controllers\Admin\Commerce;

use App\Facades\Settings;
use App\Filters\CategoryFilter;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CategoryFilter $filter): Response
    {
        //
        Gate::authorize('viewAny', Category::class);
        //
        $categories = Category::filter($filter)
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page'))
            ->withQueryString();
        //
        return Inertia::render('Admin/Commerce/Categories/Index', [
            'data' => [
                'categories' => CategoryResource::collection($categories)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
        Gate::authorize('create', Category::class);
        //
        $nextOrder = (Category::max('order') ?? 0) + 1;

        return Inertia::render('Admin/Commerce/Categories/Create', [
            'data' => [
                'public' => false,
                'order' => $nextOrder
            ],

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        //
        Gate::authorize('create', Category::class);

        $category = Category::create($request->validated());

        //
        return redirect()->route('admin.categories.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Category `" . $category->title . "` successfully created!",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): Response
    {
        //
        Gate::authorize('view', $category);
        //
        return Inertia::render('Admin/Commerce/Categories/Show', [
            'data' => [
                'category' => $category
            ],

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category): Response
    {
        //
        Gate::authorize('update', $category);
        //
        return Inertia::render('Admin/Commerce/Categories/Edit', [
            'data' => [
                'category' => $category
            ],

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        //
        Gate::authorize('update', $category);
        //
        $category->fill($request->validated());
        $category->save();

        return redirect()->route('admin.categories.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Category `" . $category->title . "`  successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        //
        Gate::authorize('delete', $category);
        //
        $category->clearMediaCollection('images');
        $category->delete();

        return redirect()->route('admin.categories.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Category successfully deleted!",
            ],
        ]);
    }
}
