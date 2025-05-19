<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\MediaService;

class MediaController extends Controller
{
    public function __construct(
        protected MediaService $mediaService
    ) {}

    /**
     * Get media items for a specific model and collection.
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'collection' => 'required|string',
        ]);

        $media = $this->mediaService->getMedia(
            $validated['model_type'],
            $validated['model_id'],
            $validated['collection']
        );

        if ($media === null) {
            return response()->json(['message' => 'Model not found or not media-capable.'], 422);
        }

        return response()->json(['media' => $media]);
    }

    /**
     * Upload one or multiple media files to the model.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'collection' => 'required|string',
            'files' => 'required|array',
            'files.*' => 'file|max:5120', // 5MB per file
        ]);

        $media = $this->mediaService->storeMedia(
            $validated['model_type'],
            $validated['model_id'],
            $validated['collection'],
            $request->file('files')
        );

        if ($media === null) {
            return response()->json(['message' => 'Model not found or not media-capable.'], 422);
        }

        return response()->json(['media' => $media], 201);
    }

    /**
     * Reorder media items by ID => order.
     */
    public function sort(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'collection' => 'required|string',
            'order' => 'required|array',
        ]);

        $success = $this->mediaService->sortMedia(
            $validated['model_type'],
            $validated['model_id'],
            $validated['order']
        );

        return $success
            ? response()->json(['status' => 'ok'])
            : response()->json(['message' => 'Model not found or not media-capable.'], 422);
    }

    /**
     * Delete a single media item.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->mediaService->deleteMedia($id);

        return $deleted
            ? response()->json(['status' => 'ok'])
            : response()->json(['message' => 'Failed to delete media item.'], 500);
    }
}
