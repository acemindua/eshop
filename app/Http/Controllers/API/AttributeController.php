<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class AttributeController extends Controller
{
    /**
     * Display a listing of the attributes.
     *
     * Retrieves all attributes, sorted by public visibility (descending),
     * custom order (ascending), and creation date (descending).
     * Returns them as a JSON response using AttributeResource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Optional: check if request expects JSON
        if (!$request->expectsJson()) {
            return response()->json([
                'message' => 'Invalid request type. JSON expected.'
            ], Response::HTTP_BAD_REQUEST);
        }

        $attributes = Attribute::query()
            ->orderByDesc('public')      // show public ones first
            ->orderBy('order')           // then by custom order
            ->orderByDesc('created_at')  // then by latest created
            ->get();

        return response()->json(
            AttributeResource::collection($attributes),
            Response::HTTP_OK
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Attribute $attribute)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attribute $attribute)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attribute $attribute)
    {
        //
    }
}
