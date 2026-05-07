<?php

namespace App\Http\Controllers; // Переконайтеся, що шлях відповідає вашим роутам

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use App\Models\Shipping;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Відображення сторінки кошика (Cart.vue)
     */
    public function index()
    {
        return Inertia::render('Public/Commerce/Cart');
    }

    /**
     * Додавання товару в кошик
     */
    public function add(Request $request)
    {
        // DarrylDecode Cart
        Cart::add([
            'id' => $request->id,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => (int)$request->quantity,
            'attributes' => [
                'image' => $request->image, // Передаємо зображення в атрибути
            ]
        ]);

        return back();
    }

    /**
     * Оновлення кількості товару (PATCH /cart/{id})
     */
    public function update(Request $request, $id)
    {
        Cart::update($id, [
            'quantity' => [
                'relative' => false,
                'value' => (int)$request->quantity
            ],
        ]);

        return back();
    }

    /**
     * Видалення товару (DELETE /cart/{id})
     */
    public function destroy($id)
    {
        Cart::remove($id);

        return back();
    }

    /**
     * Сторінка оформлення замовлення (Checkout.vue)
     */
    public function checkout()
    {
        // Якщо кошик порожній, не пускаємо на оформлення
        if (Cart::isEmpty()) {
            return redirect()->route('cart.index');
        }
        $paymentMethods = PaymentMethod::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($method) {
                return [
                    'code' => $method->code,
                    'label' => $method->title, // Завдяки вашим перекладам тут буде текст потрібною мовою
                    'description' => $method->description,
                ];
            });
        return Inertia::render('Public/Commerce/Checkout', [
            'paymentMethods' => $paymentMethods,
            'shippingMethods' => Shipping::where('is_active', true)
                ->orderBy('sort_order')
                ->get()
        ]);
    }
}
