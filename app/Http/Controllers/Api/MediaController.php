<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\MediaService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class MediaController
 *
 * Handles API endpoints for generic polymorphic media management,
 * including fetching, uploading, sorting, and deleting files.
 *
 * @package App\Http\Controllers\API
 */
class MediaController extends Controller
{
    /**
     * MediaController constructor.
     *
     * @param MediaService $mediaService The business logic layer for media operations.
     */
    public function __construct(
        protected MediaService $mediaService
    ) {}

    /**
     * Display a listing of media items for a specific model and collection.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'model_type' => 'required|string',
            'model_id'   => 'required|integer',
            'collection' => 'required|string',
        ]);

        try {
            $media = $this->mediaService->getMedia(
                $validated['model_type'],
                (int) $validated['model_id'],
                $validated['collection']
            );

            return response()->json([
                'success' => true,
                'data'    => $media,
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Upload one or multiple media files and attach them to the model.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'model_type' => 'required|string',
            'model_id'   => 'required|integer',
            'collection' => 'required|string',
            'files'      => 'required|array',
            'files.*'    => 'file|max:5120', // Max 5MB per file
        ]);

        try {
            $files = $request->file('files');

            $media = $this->mediaService->storeMedia(
                $validated['model_type'],
                (int)$validated['model_id'],
                $validated['collection'],
                $files
            );

            if (empty($media)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No files could be processed or uploaded.',
                ], Response::HTTP_BAD_REQUEST);
            }

            return response()->json([
                'success' => true,
                'message' => 'Media uploaded successfully.',
                'data'    => $media,
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Reorder media items dynamically based on a sequential array of IDs.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function sort(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'model_type' => 'required|string',
            'model_id'   => 'required|integer',
            'collection' => 'nullable|string',
            'order'      => 'required|array',
            'order.*'    => 'required|integer',
        ]);

        try {
            $success = $this->mediaService->sortMedia(
                $validated['model_type'],
                (int)$validated['model_id'],
                $validated['order']
            );

            if (!$success) {
                return response()->json([
                    'success' => false,
                    'message' => 'Target model not found or sorting failed.',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            return response()->json([
                'success' => true,
                'message' => 'Media sequence updated successfully.',
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove a single media item permanently.
     *
     * @param int $id Database identifier of the target media item.
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $deleted = $this->mediaService->deleteMedia($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Media item not found or could not be deleted.',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Media item deleted successfully.',
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
