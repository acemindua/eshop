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

    protected const DIRECTORY = 'Admin/Commerce/Categories';
    protected const ROUTE_PREFIX = 'admin.commerce.categories';
    /**
     * Display a listing of categories.
     * Includes the parent relationship to show hierarchy in the table.
     */
    public function index(CategoryFilter $filter): Response
    {
        Gate::authorize('viewAny', Category::class);

        $categories = Category::filter($filter)
            ->with(['parent']) // Optimized to prevent N+1 queries
            ->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(Settings::get('items_per_page', 15))
            ->withQueryString();

        return Inertia::render(self::DIRECTORY . '/Index', [
            'data' => [
                'categories' => CategoryResource::collection($categories)
            ],
            'filters' => request()->all(['search', 'status', 'field', 'direction']),
            'routePrefix' => self::ROUTE_PREFIX
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        Gate::authorize('create', Category::class);

        return Inertia::render(self::DIRECTORY . '/Create', [
            'data' => [
                'categories' => CategoryResource::collection($this->getParentOptions()),
                'public'     => false,
                'order'      => (Category::max('order') ?? 0) + 1,
            ],
            'routePrefix' => self::ROUTE_PREFIX,
            'isEditing' => false,
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        Gate::authorize('create', Category::class);

        $category = Category::create($request->validated());

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Category `{$category->title}` successfully created!",
            ],
        ]);
    }

    /**
     * Display a specific category.
     */
    public function show(Category $category): Response
    {
        Gate::authorize('view', $category);

        return Inertia::render(self::DIRECTORY . '/Show', [
            'data' => [
                'category' => new CategoryResource($category->load('parent'))
            ],
        ]);
    }

    /**
     * Show the form for editing.
     * Excludes current category from parent options to prevent circular dependency.
     */
    public function edit(Category $category): Response
    {
        Gate::authorize('update', $category);

        return Inertia::render(self::DIRECTORY . '/Edit', [
            'data' => [
                'category'   => $category,
                'categories' => CategoryResource::collection($this->getParentOptions($category->id)),
            ],
            'routePrefix' => self::ROUTE_PREFIX,
            'isEditing' => true,
        ]);
    }

    /**
     * Update the category in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        Gate::authorize('update', $category);

        $category->update($request->validated());

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Category `{$category->title}` successfully updated!",
            ],
        ]);
    }

    /**
     * Remove the category and its media.
     */
    public function destroy(Category $category): RedirectResponse
    {
        Gate::authorize('delete', $category);

        $category->clearMediaCollection('images');
        $category->delete();

        return redirect()->route(self::ROUTE_PREFIX . '.index')->with([
            'alert' => [
                'type'    => 'success',
                'message' => "Category successfully deleted!",
            ],
        ]);
    }

    /**
     * Helper: Fetch potential parent categories.
     * If $excludeId is provided, that category and potentially its children 
     * should be filtered out to prevent circular references.
     */
    private function getParentOptions(?int $excludeId = null)
    {
        $query = Category::all();

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query;
    }
}
