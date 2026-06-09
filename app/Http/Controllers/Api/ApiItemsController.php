<?php

namespace App\Http\Controllers\Api;

use App\Facades\Settings;
use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class ApiItemsController extends Controller
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
     * Display a listing of the resource.
     */
    public function index(ItemFilter $filter): JsonResponse
    {
        // Отримуємо товари з урахуванням фільтрів та пагінації
        $items = Item::filter($filter)
            ->with(['category', 'manufacturer']) // Оптимізація запитів
            ->where('public', true)               // Тільки публічні товари для API
            ->latest()
            ->paginate(request('per_page', 15));
        return response()->json(ItemResource::collection($items));
    }

    /**
     * Display a listing of the popular resources.
     */
    public function popular(Request $request): JsonResponse
    {
        $locale = $request->locale ?? config('app.locale');
        $this->validateAndSetLocale($locale);

        $perPage = $request->per_page ?? Settings::get('items_per_page', 15);

        $items = Item::where('public', true)
            ->latest()
            ->paginate($perPage);

        return response()->json(['items' => ItemResource::collection($items), 'locale' => $locale, 'per_page' => $perPage]);
    }
}
