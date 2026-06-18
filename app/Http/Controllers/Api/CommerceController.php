<?php

namespace App\Http\Controllers\Api;

use App\Facades\Settings;
use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Models\{Brand, Category, Item};
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommerceController extends Controller
{
    public function getItems(ItemFilter $filter): JsonResponse
    {
        try {
            $query = Item::active()->filter($filter);
            $category = collect();

            $filterForBrand = request()->except(['brands', 'sort']);
            $countFilterBrand = new ItemFilter(new Request($filterForBrand));
            $brandCounts = Item::query()->active()
                ->filter($countFilterBrand)
                ->selectRaw('brand_id, COUNT(*) as count')
                ->groupBy('brand_id')
                ->pluck('count', 'brand_id');
            $brands = Brand::whereIn('id', $brandCounts->keys())->get()->map(fn($brand) => [
                'id'    => $brand->id,
                'title' => $brand->title,
                'count' => $brandCounts[$brand->id] ?? 0,
            ])->values();

            $filterForCat = request()->except(['categories', 'sort']);
            $countFilterCat = new ItemFilter(new Request($filterForCat));
            $catCounts = Item::query()->active()
                ->filter($countFilterCat)
                ->selectRaw('category_id, COUNT(*) as count')
                ->groupBy('category_id')
                ->pluck('count', 'category_id');
            $categories = Category::whereIn('id', $catCounts->keys())->get()->map(fn($cat) => [
                'id'    => $cat->id,
                'title' => $cat->title,
                'count' => $catCounts[$cat->id] ?? 0,
            ])->values();

            $items = $query
                ->paginate(Settings::get('items_per_page', 16))
                ->withPath(route('resolve.route', $category)) ?? collect();

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
                'categories' => $categories,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            Log::error("Items Error: " . $e->getMessage());
            return response()->json(['message' => 'Server Error'], 500);
        }
    }
}
