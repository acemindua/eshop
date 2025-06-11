<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product; // Make sure Product model is correctly imported
use Illuminate\Http\Request;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia; // Keep if you intend to use Inertia rendering for this page

class CartController extends Controller
{
    /**
     * Helper method to format cart data for consistent API responses.
     * @return array
     */
    protected function getFormattedCartData(): array
    {
        $items = Cart::getContent()->map(function ($item) {
            return [
                'id' => $item->id, // This is the cart item ID (e.g., product_id-variant_id)
                'product_id' => $item->attributes->product_id ?? $item->id, // Original product ID
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
     * Display the cart contents.
     * This method can serve either a JSON API response or an Inertia page.
     * Uncomment the Inertia::render if you're loading this as a full page.
     * For a SPA, typically only the JSON response is needed.
     *
     * @return JsonResponse|\Inertia\Response
     */
    public function index(): JsonResponse // Changed return type hint
    {
        return response()->json($this->getFormattedCartData());

        /*
        // Uncomment the following lines if you need to render an Inertia page
        // with cart data. Ensure your frontend is set up to consume this.
        return Inertia::render('Cart/Index', [
             'cart' => $this->getFormattedCartData(),
        ]);
        */
    }

    /**
     * Add a new item to the cart.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'required|exists:products,id',
            'title' => 'string|min:3',
            'price' => 'required|numeric|min:0', // Price can be 0 for free items
            'quantity' => 'required|integer|min:1',
            'variant_id' => 'nullable|integer',
            'image' => 'nullable|string', // Assuming image is a URL or path string
            'slug' => 'required|array', // Assuming slug is an array like ['product' => '...', 'variant' => '...']
            'slug.product' => 'required|string',
            'slug.variant' => 'nullable|string',
        ]);

        $product = Product::find($validated['id']);

        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }

        // Generate a unique ID for the cart item, combining product ID and variant ID
        $cartItemId = $product->id . '-' . ($validated['variant_id'] ?? 'default');

        Cart::add([
            'id' => $cartItemId,
            'name' => $validated['title'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'attributes' => [
                'product_id' => $product->id,
                'variant_id' => $validated['variant_id'] ?? null,
                'image' => $validated['image'],
                'slug' => $validated['slug'],
            ],
        ]);

        return response()->json([
            'message' => 'Item added to cart.',
            'cart' => $this->getFormattedCartData() // Return updated cart data
        ], 200);
    }

    /**
     * Update the quantity of an item in the cart.
     *
     * @param Request $request
     * @param string $cartItemId The unique ID of the item in the cart (e.g., 'product_id-variant_id')
     * @return JsonResponse
     */
    public function update(Request $request, string $cartItemId): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0', // Allow 0 to handle removal by setting quantity to 0
        ]);

        if (!Cart::get($cartItemId)) {
            return response()->json(['message' => 'Cart item not found.'], 404);
        }

        $newQuantity = $validated['quantity'];

        if ($newQuantity <= 0) {
            // If new quantity is 0 or less, remove the item
            Cart::remove($cartItemId);
            $message = 'Item removed from cart.';
        } else {
            // Otherwise, update the quantity
            Cart::update($cartItemId, [
                'quantity' => [
                    'relative' => false, // Set to false to use absolute quantity
                    'value' => $newQuantity,
                ],
            ]);
            $message = 'Cart item quantity updated.';
        }

        return response()->json([
            'message' => $message,
            'cart' => $this->getFormattedCartData() // Return updated cart data
        ], 200);
    }

    /**
     * Remove a specific item from the cart.
     *
     * @param Request $request
     * @param string $cartItemId The unique ID of the item in the cart to remove.
     * @return JsonResponse
     */
    public function remove(Request $request, string $cartItemId): JsonResponse
    {
        if (!Cart::get($cartItemId)) {
            return response()->json(['message' => 'Cart item not found.'], 404);
        }

        Cart::remove($cartItemId);

        return response()->json([
            'message' => 'Item successfully removed from cart.',
            'cart' => $this->getFormattedCartData(), // Return updated cart data
        ], 200);
    }

    /**
     * Clear the entire cart.
     *
     * @return JsonResponse
     */
    public function clear(): JsonResponse
    {
        Cart::clear();

        return response()->json([
            'message' => 'Cart successfully cleared!',
            'cart' => $this->getFormattedCartData(), // Return empty cart data
        ], 200);
    }
}
