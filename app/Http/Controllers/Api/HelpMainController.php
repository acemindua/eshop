<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PageResource;
use App\Models\Category;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class HelpMainController extends Controller
{
    /**
     * Display a listing of the resource.
     * Отримує категорії, вибираючи лише необхідні поля та забезпечуючи наявність
     * українського перекладу.
     */
    public function getMenu(Request $request): JsonResponse
    {
        // Use config('app.locale') as the fallback default, as you updated it to.
        $locale = $request->locale ?? config('app.locale');
        $locales = array_keys(LaravelLocalization::getSupportedLocales());

        // 1. Early exit for unsupported locales
        if (!in_array($locale, $locales)) {
            Log::warning("Request received for unsupported locale: '{$locale}'");

            return response()->json([
                'items'     => [],
                'locale'    => $locale,
                'message'   => 'Unsupported locale requested.'
            ], 400); // Bad Request
        }

        try {

            if ($request->filled('locale')) {
                App::setLocale($request->locale);
            }

            $pages = Page::query()
                ->select('id')
                ->where('public', true)
                ->get();

            return response()->json([
                'items'     => PageResource::collection($pages),
                'locale'    => $locale
            ], 200);
        } catch (\Exception $e) {
            // 3. Log a more informative error message
            Log::error("Failed to fetch menu pages for locale '{$locale}': " . $e->getMessage(), ['exception' => $e]);

            // 4. Return a 500 Internal Server Error for application exceptions
            return response()->json([
                'message'   => 'An internal error occurred while fetching the menu.',
                'locale'    => $locale,
                'items'     => [],
            ], 500);
        }
    }

    public function getCategories(Request $request): JsonResponse
    {
        // Use config('app.locale') as the fallback default, as you updated it to.
        $locale = $request->locale ?? config('app.locale');
        $locales = array_keys(LaravelLocalization::getSupportedLocales());

        // 1. Early exit for unsupported locales
        if (!in_array($locale, $locales)) {
            Log::warning("Request received for unsupported locale: '{$locale}'");

            return response()->json([
                'items'     => [],
                'locale'    => $locale,
                'message'   => 'Unsupported locale requested.'
            ], 400); // Bad Request
        }

        try {

            if ($request->filled('locale')) {
                App::setLocale($request->locale);
            }

            $recursiveLoad = function ($query) use (&$recursiveLoad) {
                $query->where('public', true);
                $query->with(['childs' => $recursiveLoad]);
            };

            $categories = Category::query()
                ->select('id', 'public', 'category_id')
                ->where('category_id', null)
                ->where('public', true)
                ->with('parent')
                ->with(['childs' => $recursiveLoad])
                ->get();

            return response()->json([
                'items'     => CategoryResource::collection($categories),
                'locale'    => $locale
            ], 200);
        } catch (\Exception $e) {
            // 3. Log a more informative error message
            Log::error("Failed to fetch menu pages for locale '{$locale}': " . $e->getMessage(), ['exception' => $e]);

            // 4. Return a 500 Internal Server Error for application exceptions
            return response()->json([
                'message'   => 'An internal error occurred while fetching the menu.',
                'locale'    => $locale,
                'items'     => [],
            ], 500);
        }
    }
}
