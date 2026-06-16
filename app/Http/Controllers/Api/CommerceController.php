<?php

namespace App\Http\Controllers\Api;

use App\Facades\Settings;
use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Models\{Brand, Item};
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class CommerceController extends Controller
{
    public function getItems(ItemFilter $filter): JsonResponse
    {
        try {
            $category = \App\Models\Category::find(request()->category_id);
            $allCategoryIds = $category ? $category->getAllChildrenIds() : \App\Models\Category::pluck('id');

            // 1. Отримуємо параметри запиту, видаляємо 'brands' для підрахунку
            $filterData = request()->all();
            unset($filterData['brands']);
            unset($filterData['sort']);
            //unset($filterData['rating']);
            // 2. Створюємо "чистий" об'єкт фільтра для підрахунку
            // Ми використовуємо Request, щоб створити новий фільтр без брендів
            $countFilter = new ItemFilter(new \Illuminate\Http\Request($filterData));

            // 3. Підрахунок (Count Query)
            $brandCounts = Item::query()
                ->where('public', true)
                ->whereIn('category_id', $allCategoryIds)
                ->filter($countFilter) // Цей фільтр НЕ містить брендів, тому помилки не буде
                ->selectRaw('brand_id, count(*) as count')
                ->groupBy('brand_id')
                ->pluck('count', 'brand_id');

            // 4. Отримуємо товари (Item Query) - тут застосовуємо ПОВНИЙ фільтр
            $items = Item::query()
                ->where('public', true)
                ->whereIn('category_id', $allCategoryIds)
                ->filter($filter) // Тут фільтр з брендами працює як треба
                ->with(['category', 'brand'])
                ->paginate(Settings::get('items_per_page', 16));
            $items->withPath(route('resolve.route', $category));
            // 5. Список брендів (стабільний)
            $allBrandIdsInCurrentCategory = Item::whereIn('category_id', $allCategoryIds)
                ->distinct()
                ->pluck('brand_id');

            $brands = Brand::whereIn('id', $allBrandIdsInCurrentCategory)
                ->get()
                ->map(fn($brand) => [
                    'id'    => $brand->id,
                    'title' => $brand->title,
                    'count' => $brandCounts[$brand->id] ?? 0,
                ]);

            return response()->json([
                'items'     => ItemResource::collection($items),
                'meta' => [
                    'links' => $items->linkCollection()->toArray(), // ЦЕ КЛЮЧОВИЙ МОМЕНТ для вашого компонента
                    'current_page' => $items->currentPage(),
                    'last_page' => $items->lastPage(),
                    'from' => $items->firstItem(),
                    'to' => $items->lastItem(),
                    'total' => $items->total(),
                ],
                'brands'  => $brands,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            Log::error("Items Error: " . $e->getMessage());
            return response()->json(['message' => 'Server Error'], 500);
        }
    }
}
