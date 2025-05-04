<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

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

        return response()->json($query->get(), Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        try {
            $attributeValue = AttributeValue::create($request->all());
            return response()->json($attributeValue, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            // Якщо є помилки валідації, повертаємо їх у відповіді
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
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
        // Знаходимо атрибут за ID
        $attributeValue = AttributeValue::find($id);

        // Якщо атрибут не знайдено, повертаємо помилку 404
        if (!$attributeValue) {
            return response()->json([
                'message' => 'Attribute value not found'
            ], Response::HTTP_NOT_FOUND);
        }

        // Видаляємо атрибут
        $attributeValue->delete();

        // Повертаємо успішну відповідь
        return response()->json([
            'message' => 'Attribute value deleted successfully'
        ], Response::HTTP_OK);
    }
}
