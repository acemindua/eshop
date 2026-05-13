<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\WarehouseResource;
use App\Models\Item;
use App\Models\Order;
use App\Models\Shipping;
use App\Models\PaymentMethod;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Darryldecode\Cart\Facades\CartFacade as Cart;

class CartController extends Controller
{
    /**
     * Display the shopping cart page.
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Public/Commerce/Cart', [
            'cart' => [
                'items' => Cart::getContent()->values(),
                'total' => Cart::getTotal(),
            ]
        ]);
    }

    /**
     * Add a product to the cart.
     * Note: We fetch the price from the Database to prevent client-side manipulation.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function add(Request $request): RedirectResponse
    {
        $product = Item::findOrFail($request->id);

        Cart::add([
            'id'         => $product->id,
            'name'       => $product->title, // Using title from DB
            'price'      => $product->price, // Secure price from DB
            'quantity'   => (int) $request->quantity,
            'attributes' => [
                'image' => $product->main_image ?? $request->image,
                'slug'  => $product->slug,
            ]
        ]);

        return back()->with('success', 'Product added to cart');
    }

    /**
     * Display the checkout page with necessary payment and shipping methods.
     *
     * @return Response|RedirectResponse
     */
    public function checkout(Request $request)
    {
        if (Cart::isEmpty()) {
            return redirect()->route('cart.index');
        }

        $paymentMethods = PaymentMethod::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn($method) => [
                'code'        => $method->code,
                'label'       => $method->title, // Multilingual via Translatable
                'description' => $method->description,
            ]);

        $shippingMethods = Shipping::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Public/Commerce/Checkout/Index', [
            'data' => [
                'authUser'=>$request->user() ? new UserResource($request->user()) : null,
                'paymentMethods'  => $paymentMethods,
                'shippingMethods' => $shippingMethods,
                'warehouses' => WarehouseResource::collection(
                    Warehouse::where('is_active', true)->orderBy('sort_order')->get()
                )->resolve(request()),
                'cart' => [
                    'items'    => Cart::getContent()->values(),
                    'subtotal' => Cart::getSubTotal(),
                    'total'    => Cart::getTotal(),
                ]
            ]
        ]);
    }

    /**
     * Process the order submission using specialized Request.
     *
     * @param StoreOrderRequest $request
     * @return RedirectResponse
     */
    public function store(StoreOrderRequest $request): RedirectResponse
    {
        // Дані вже пройшли валідацію та підготовку (очищення телефону)
        $validated = $request->validated();

        dd($request->all());

        try {
            return DB::transaction(function () use ($validated) {
                // 1. Створюємо основне замовлення
                $order = Order::create([
                    'user_id'        => auth()->id(),
                    'total_price'    => Cart::getTotal(),
                    'status'         => 'new',
                    'payment_method' => $validated['payment_method'],
                    'notes'          => $validated['comment'] ?? null,
                    'delivery_info'  => [
                        'method'    => $validated['delivery_method'],
                        'warehouse' => $validated['warehouse'] ?? null,
                        // Додаткові метадані Nova Poshta, якщо вони є в запиті
                        'city_ref'      => request('city_ref'),
                        'warehouse_ref' => request('warehouse_ref'),
                    ],
                    'customer_info'  => [
                        'first_name'  => $validated['first_name'],
                        'last_name'   => $validated['last_name'],
                        'middle_name' => $validated['middle_name'] ?? null,
                        'phone'       => $validated['phone'],
                        'email'       => $validated['email'],
                    ]
                ]);

                // 2. Зберігаємо товари (Snapshot цін)
                foreach (Cart::getContent() as $item) {
                    $order->items()->create([
                        'product_id' => $item->id,
                        'title'      => $item->name,
                        'price'      => $item->price,
                        'quantity'   => $item->quantity,
                        'options'    => $item->attributes->toArray(),
                    ]);
                }

                // 3. Очищення кошика
                Cart::clear();

                return redirect()->route('order.success', $order->id)
                    ->with('message', 'Замовлення успішно оформлено!');
            });
        } catch (\Exception $e) {
            // Рекомендую додати логування помилок для розробки
            \Log::error("Order creation failed: " . $e->getMessage());

            return back()->withErrors(['error' => 'Сталася помилка при оформленні. Спробуйте пізніше.']);
        }
    }

    /**
     * Update the quantity of a specific item in the cart.
     *
     * @param Request $request
     * @param mixed $id
     * @return RedirectResponse
     */
    public function update(Request $request, $id): RedirectResponse
    {
        Cart::update($id, [
            'quantity' => [
                'relative' => false,
                'value'    => (int) $request->quantity
            ],
        ]);

        return back();
    }

    /**
     * Remove an item from the cart.
     *
     * @param mixed $id
     * @return RedirectResponse
     */
    public function destroy($id): RedirectResponse
    {
        Cart::remove($id);

        return back();
    }
}
