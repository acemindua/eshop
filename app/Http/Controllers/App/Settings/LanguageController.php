<?php

namespace App\Http\Controllers\App\Settings;

use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Http\Requests\StoreLanguageRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Language::class);

        $data = Language::latest('public')
            ->paginate(14)
            ->withQueryString();

        return Inertia::render(
            'App/Settings/Languages/Index',
            [
                'data' => $data
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Language::class);
    }

    /**
     * Update the specified resource in storage.
     */
    public function store(StoreLanguageRequest $request): RedirectResponse
    {
        Gate::authorize('create', Language::class);

        $codes = $request->input('codes', []);

        // Вимикаємо всі мови одним запитом
        Language::query()->update(['public' => false]);

        // Вмикаємо вибрані мови або поточну мову додатку
        $codes = !empty($codes) ? $codes : [app()->getLocale()];
        Language::whereIn('code', $codes)->update(['public' => true]);

        return Redirect::route('admin.languages.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Language $language)
    {
        Gate::authorize('view', $language);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Language $language)
    {
        Gate::authorize('update', $language);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Language $language)
    {
        Gate::authorize('update', $language);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Language $language)
    {
        Gate::authorize('delete', $language);
    }
}
