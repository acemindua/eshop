<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AttributeValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = AttributeValue::query();

        if ($request->has('attribute_id')) {
            $query->where('attribute_id', $request->attribute_id);
        }

        return response()->json($query->orderByDesc('public')->orderBy('order')->latest()->get(), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $data = $request->all();
        $data['public'] = filter_var($data['public'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

        $attr = new AttributeValue();
        $attr->fill($data);
        $attr->save();

        return response()->json($attr);
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
        $data = $request->all();
        $data['public'] = filter_var($data['public'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
        $attr = AttributeValue::find($id);

        $attr->fill($data);
        $attr->save();

        return response()->json($attr);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id = null) 
    {
        $ids = $request->input('ids', []);

        if ($ids && is_array($ids)) {
            AttributeValue::whereIn('id', $ids)->delete();

            return response()->json([
                'message' => 'Attribute values deleted successfully',
            ], Response::HTTP_OK);
        }

        $attributeValue = AttributeValue::find($id);

        if (!$attributeValue) {
            return response()->json([
                'message' => 'Attribute value not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $attributeValue->delete();

        return response()->json([
            'message' => 'Attribute value deleted successfully',
        ], Response::HTTP_OK);
    }
}
