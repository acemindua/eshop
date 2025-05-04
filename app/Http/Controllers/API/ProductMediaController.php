<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductMediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get(Product $product)
    {
        return  response()->json($product->sorted_images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Product $product)
    {
        $request->validate([
            'images.*' => 'required|image|max:2048',
        ]);

        try {
            $uploadedMedia = [];

            foreach ($request->file('images', []) as $image) {
                $media = $product->addMedia($image)->toMediaCollection('images');

                $uploadedMedia[] = [
                    'url' => $media->getUrl(),
                    'preview' => $media->getUrl('preview'),
                ];
            }

            return response()->json(['media' => $uploadedMedia], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Помилка під час завантаження зображень.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Sort the specified resource in storage.
     */
    public function sort(Request $request, Product $product)
    {
        foreach ($request->input('order', []) as $mediaId => $order) {
            $media = Media::find($mediaId);
            if ($media && $media->model_type === Product::class && $media->model_id === $product->id) {
                $media->order_column = $order;
                $media->save();
            }
        }

        return response()->json(['status' => 'ok']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, int $id)
    {
        $media = Media::find($id);

        if (!$media) {
            return response()->json([
                'success' => false,
                'message' => 'Медіа не знайдено.'
            ], 404);
        }

        if ($media->model_type !== Product::class || $media->model_id !== $product->id) {
            return response()->json([
                'success' => false,
                'message' => 'Це зображення не належить цьому продукту.'
            ], 403);
        }

        $media->delete();
        return response()->json(['status' => 'ok']);
    }
}
