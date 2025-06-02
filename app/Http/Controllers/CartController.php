<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Inertia\Inertia;

class CartController extends Controller
{

    /**
     * Helper method to format cart data for both JSON and Inertia.
     * Making it public or abstracting it to a service is ideal.
     */
    public function getFormattedCartData(): array // Changed visibility and name
    {
        $items = Cart::getContent()->map(function ($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->attributes->product_id ?? $item->id,
                'name' => $item->name,
                'price' => (float) $item->price,
                'quantity' => (int) $item->quantity,
                'subtotal' => (float) $item->getPriceSum(),
                'attributes' => $item->attributes->toArray(),
            ];
        })->values()->toArray();

        return [
            'items' => $items,
            'total' => (float) Cart::getSubTotal(),
            'itemCount' => (int) Cart::getTotalQuantity(),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json($this->getFormattedCartData());
        //
        return Inertia::render('Cart/Index', [
            'cart' => $this->getFormattedCartData(), // Use the new helper
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($request->id);

        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }

        Cart::add([
            'id' => $product->id,
            'name' => $product->title,
            'price' => $product->price,
            'quantity' => $request->quantity,
            'attributes' => [
                'image' => $product->image,
                'description' => $product->description,
                'product_id' => $product->id,
            ],
        ]);

        return response()->json(['message' => 'Item added to cart.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
