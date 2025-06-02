<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $cartItems = Cart::getContent();
        $formattedItems = [];

        // Format items to include attributes like image and be an indexed array
        foreach ($cartItems as $item) {
            $formattedItems[] = [
                'id' => $item->id, // This is darryldecode/cart's unique rowId
                'product_id' => $item->attributes->product_id, // Store actual product ID for frontend updates
                'name' => $item->title,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'attributes' => $item->attributes->toArray(), // Includes image, etc.
            ];
        }

        return response()->json([
            'items' => $formattedItems,
            'total' => Cart::getSubTotal(), // Use getSubTotal for the sum of prices * quantities
            'itemCount' => Cart::getTotalQuantity(), // Total unique items or total quantity? Using total quantity
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) //: JsonResponse
    {

        //
        $request->validate([
            'id'        => 'required|exists:products,id',
            'quantity'  => 'required|integer|min:1',
        ]);

        $product = Product::find($request->id);



        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }

        // Add the item to the cart using darryldecode/cart
        Cart::add([
            'id' => $product->id, // Use product ID as the item ID (darryldecode/cart will handle duplicates)
            'name' => $product->title,
            'price' => $product->price,
            'quantity' => $request->quantity,
        ]);
   

        return response()->json(['message' => 'Item added to cart.', 'cart' => $this->index()->original]);
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
        $request->validate([
            'row_id' => 'required', // This is darryldecode/cart's unique rowId for the item
            'quantity' => 'required|integer|min:0', // Allow 0 to remove
        ]);

        if ($request->quantity === 0) {
            Cart::remove($request->row_id);
            return response()->json(['message' => 'Item removed from cart.', 'cart' => $this->index()->original]);
        }

        Cart::update($request->row_id, [
            'quantity' => [
                'relative' => false, // Set to false to directly set the quantity
                'value' => $request->quantity
            ],
        ]);

        return response()->json(['message' => 'Cart updated.', 'cart' => $this->index()->original]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        //
        $request->validate([
            'row_id' => 'required', // This is darryldecode/cart's unique rowId for the item
        ]);

        Cart::remove($request->row_id);

        return response()->json(['message' => 'Item removed from cart.', 'cart' => $this->index()->original]);
    }
}
