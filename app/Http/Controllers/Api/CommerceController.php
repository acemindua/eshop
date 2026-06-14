<?php

namespace App\Http\Controllers\Api;

use App\Filters\ItemFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use App\Http\Resources\ManufacturerResource;
use App\Models\Item;
use App\Models\Manufacturer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class CommerceController extends Controller
{
    public function getItems(ItemFilter $filter): JsonResponse
    {
        try {
            $query = Item::query()->where('public', true)->filter($filter)->with(['category', 'manufacturer']);
            $items = $query->latest()->get();
            $availableBrands = Manufacturer::whereIn('id', $items->pluck('manufacturer_id')->unique())
                ->get();


            return response()->json([
                'items'         => ItemResource::collection($items),
                'brands'        => ManufacturerResource::collection($availableBrands),
                'message'       => 'Success'
            ], 200);
        } catch (\Exception $e) {
            Log::error("Items Error: " . $e->getMessage());
            return response()->json(['message' => 'Server Error'], 500);
        }
    }
}
