<?php

namespace App\Http\Controllers\App\Commerce;

use App\Filters\AttributeFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use App\Models\Product;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class AttributeController extends Controller
{
    public function __construct(public int $pages = 15) {}

    /**
     * Display a listing of the attributes.
     */
    public function index(AttributeFilter $filter): Response
    {
        Gate::authorize('viewAny', Product::class);

        $attributes = Attribute::filter($filter)
            ->orderByDesc('public')
            ->orderBy('order')
            ->latest()
            ->paginate($this->pages)
            ->withQueryString();

        return Inertia::render('App/Commerce/Attributes/Index', [
            'data' => [
                'items' => AttributeResource::collection($attributes),
            ],
            'status'  => session('status'),
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new attribute.
     */
    public function create(): Response
    {
        return Inertia::render('App/Commerce/Attributes/Create', [
            'data' => [],
        ]);
    }

    /**
     * Store a newly created attribute, or restore soft-deleted if matching title exists.
     */
    public function store(StoreAttributeRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Dynamically detect locales (translated fields)
        $locales = array_filter(
            array_keys($data),
            fn($key) =>
            is_array($data[$key]) && array_key_exists('title', $data[$key])
        );

        $translations = Arr::only($data, $locales); // Translatable fields
        $commonFields = Arr::except($data, $locales); // Non-translatable fields

        // Search for soft-deleted or existing attribute with matching title in any locale
        $existing = Attribute::withTrashed()
            ->where(function (Builder $query) use ($translations) {
                foreach ($translations as $locale => $trans) {
                    if (!empty($trans['title'])) {
                        $query->orWhereTranslation('title', $trans['title'], $locale);
                    }
                }
            })
            ->first();


        if ($existing) {
            if ($existing->trashed()) {
                $existing->restore();
                $existing->fill($commonFields);
                $existing->fill($translations);
                $existing->save();

                return redirect()->route('admin.attributes.index')->with([
                    'alert' => [
                        'type' => 'success',
                        'message' => "Attribute restored and updated.",
                    ],
                ]);
            }

            return redirect()->back()->withErrors([
                'title' => 'Attribute with this title already exists.',
            ]);
        }

        // Create new attribute
        Attribute::create(array_merge($commonFields, $translations));

        return redirect()->route('admin.attributes.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Attribute successfully created!",
            ],
        ]);
    }

    /**
     * Show the form for editing the specified attribute.
     */
    public function edit(Attribute $attribute): Response
    {
        Gate::authorize('update', $attribute);

        return Inertia::render('App/Commerce/Attributes/Edit', [
            'data' => [
                'item' => $attribute,
            ],
        ]);
    }

    /**
     * Update the specified attribute.
     */
    public function update(UpdateAttributeRequest $request, Attribute $attribute): RedirectResponse
    {
        Gate::authorize('update', $attribute);

        $data = $request->validated();

        $attribute->fill($data);
        $attribute->save();

        return redirect()->route('admin.attributes.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Attribute successfully updated!",
            ],
        ]);
    }

    /**
     * Soft-delete the specified attribute.
     */
    public function destroy(Attribute $attribute): RedirectResponse
    {
        Gate::authorize('delete', $attribute);

        $attribute->delete();

        return redirect()->back()->with([
            'alert' => [
                'type' => 'success',
                'message' => "Attribute successfully deleted!",
            ],
        ]);
    }
}
