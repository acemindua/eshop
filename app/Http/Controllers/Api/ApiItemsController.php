<?php

namespace App\Http\Controllers\Api;

use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiItemsController extends Controller
{
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
}
