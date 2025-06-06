<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\SearchHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $query = trim($request->input('query'));

        if (!$query) return response()->json(['error' => 'Порожній запит'], 422);

        SearchHistory::create([
            'user_id' => auth() ? auth()->id : "",
            'query' => $query,
            'ip_address' => $request->ip(),
        ]);

        return response()->json(['message' => 'Запит збережено']);
    }


    /**
     * 
     */
    public function top(): \Illuminate\Http\JsonResponse
    {
        $topSearches = SearchHistory::select('query', DB::raw('COUNT(*) as total'))
            ->groupBy('query')
            ->orderByDesc('total')
            ->limit(5)
            ->get()
            ->map(fn($item) => [
                'query' => $item->query,
                'total' => $item->total,
            ]);

        return response()->json($topSearches);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
