<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\MenuResource;
use App\Http\Resources\PageResource;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class HelpMainController extends Controller
{
    /**
     * Validate requested locale and set application context.
     */
    private function validateAndSetLocale(string $locale): bool
    {
        $locales = array_keys(LaravelLocalization::getSupportedLocales());

        if (!in_array($locale, $locales)) {
            Log::warning("Request received for unsupported locale: '{$locale}'");
            return false;
        }

        App::setLocale($locale);
        return true;
    }

    /**
     * Fetch a single menu structure with dynamically localized links and titles.
     */
    public function menus(Request $request): JsonResponse
    {
        $locale = $request->locale ?? config('app.locale');
        $this->validateAndSetLocale($locale);

        $menu = Menu::where('slug', $request->slug)->first();

        $resource = new MenuResource($menu);

        if (!$menu) {
            return response()->json([
                'items'   => null,
                'message' => 'Menu not found.'
            ], 404);
        }

        //$resource->tree ?? [], $locale
        // Рекурсивно збагачуємо елементи локалізованими даними зі сторінок
        $localizedTree = $this->localizeTree($resource->tree ?? []);


        return response()->json(['items' => ['tree' => $localizedTree], 'locale' => $locale], 200);
    }

    //array $menu, string $locale
    /**
     * Рекурсивний обхід дерева меню для локалізації сторінок
     */
    private function localizeTree($items)
    {
        $menu = [];
        //return $items;

        if ($items) {
            foreach ($items as $item) {

                if (!empty($item['model_type']) && !empty($item['model_id'])) {
                    $modelClass = $item['model_type'];
                    if (!str_starts_with($modelClass, 'App\\Models\\')) {
                        $modelClass = 'App\\Models\\' . $modelClass;
                    }

                    if (class_exists($modelClass)) {
                        $model = $modelClass::find($item['model_id']);

                        if ($model) {
                            $menu[] = [
                                'title' => $model->title,
                                'slug'  => $model->slug,
                            ];
                        }
                    }
                } else {
                    $menu[] = [
                        'title' => __($item->label),
                        'slug'  => $item->url,
                    ];
                }
            }
        }
        return $menu;
    }

    /**
     * Display a listing of flat pages.
     */
    public function getMenu(Request $request): JsonResponse
    {
        $locale = $request->locale ?? config('app.locale');

        if (!$this->validateAndSetLocale($locale)) {
            return response()->json([
                'items'   => [],
                'locale'  => $locale,
                'message' => 'Unsupported locale requested.'
            ], 400);
        }

        try {
            $pages = Page::query()
                ->orderBy('order')
                ->get();

            return response()->json([
                'items'  => PageResource::collection($pages),
                'locale' => $locale
            ], 200);
        } catch (\Exception $e) {
            Log::error("Failed to fetch menu pages for locale '{$locale}': " . $e->getMessage(), ['exception' => $e]);

            return response()->json([
                'message' => 'An internal error occurred while fetching the menu.',
                'locale'  => $locale,
                'items'   => [],
            ], 500);
        }
    }

    /**
     * Display a nested recursive listing of public categories.
     */
    public function getCategories(Request $request): JsonResponse
    {
        $locale = $request->locale ?? config('app.locale');

        if (!$this->validateAndSetLocale($locale)) {
            return response()->json([
                'items'   => [],
                'locale'  => $locale,
                'message' => 'Unsupported locale requested.'
            ], 400);
        }

        try {
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
                'items'  => CategoryResource::collection($categories),
                'locale' => $locale
            ], 200);
        } catch (\Exception $e) {
            Log::error("Failed to fetch categories for locale '{$locale}': " . $e->getMessage(), ['exception' => $e]);

            return response()->json([
                'message' => 'An internal error occurred while fetching categories.',
                'locale'  => $locale,
                'items'   => [],
            ], 500);
        }
    }
}
