<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Product; // Припускаємо, що у вас є модель Product
use Darryldecode\Cart\Facades\CartFacade as Cart;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    /**
     * Отримує та відображає вміст кошика.
     */
    public function index(): JsonResponse
    {
        $cartItems = Cart::getContent();
        $formattedItems = [];

        foreach ($cartItems as $item) {
            $formattedItems[] = [
                'rowId' => $item->id, // Унікальний ID позиції в кошику від darryldecode/cart
                'product_id' => $item->attributes->get('product_id'), // Фактичний ID товару з вашої БД
                'name' => $item->name, // Використовуємо 'name' замість 'title' для консистентності з Darryldecode/cart
                'price' => $item->price,
                'quantity' => $item->quantity,
                'attributes' => $item->attributes->toArray(), // Усі атрибути, включаючи зображення, розмір тощо
            ];
        }

        return response()->json([
            'items' => $formattedItems,
            'total' => Cart::getTotal(), // Використовуємо getTotal() для загальної суми
            'subtotal' => Cart::getSubTotal(), // Додано subtotal, якщо потрібно без податків/знижок
            'itemCount' => Cart::getTotalQuantity(), // Загальна кількість всіх одиниць товарів у кошику
            'uniqueItemCount' => Cart::count(), // Кількість унікальних позицій (рядків) у кошику
        ]);
    }

    /**
     * Додає товар до кошика або оновлює його кількість, якщо він вже існує.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id', // Фактичний ID товару з вашої БД
                'name' => 'required|string|min:3',
                'price' => 'required|numeric|min:0',
                'quantity' => 'required|integer|min:1',
                'attributes' => 'sometimes|array', // Атрибути варіанту товару (наприклад, 'size', 'color')
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Помилка валідації.',
                'errors' => $e->errors(),
            ], 422);
        }

        $product = Product::find($validated['product_id']);

        if (!$product) {
            return response()->json(['message' => 'Товар не знайдено.'], 404);
        }

        // Додаємо product_id до атрибутів для зручного доступу на фронтенді
        $attributes = array_merge($validated['attributes'] ?? [], ['product_id' => $product->id]);

        // Darryldecode/cart автоматично розрізняє позиції за 'id' (product_id) та 'attributes'.
        // Якщо товар з таким 'product_id' та ідентичними 'attributes' вже є,
        // його кількість буде збільшено. Інакше буде додано новий рядок.
        Cart::add([
            'id' => $validated['product_id'], // Це ID товару з вашої БД, не rowId Darryldecode/cart
            'name' => $validated['name'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'attributes' => $attributes,
        ]);

        return response()->json([
            'message' => 'Товар успішно додано до кошика.',
            'cart' => $this->index()->original, // Повертаємо оновлений вміст кошика
        ]);
    }

    /**
     * Оновлює кількість або атрибути конкретної позиції в кошику.
     * Використовує 'row_id' для ідентифікації позиції.
     */
    public function update(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'row_id' => 'required|string', // Унікальний ID позиції в кошику від darryldecode/cart
                'quantity' => 'required|integer|min:0', // Дозволяє встановити 0 для видалення
                'attributes' => 'sometimes|array', // Якщо потрібно оновити атрибути позиції
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Помилка валідації.',
                'errors' => $e->errors(),
            ], 422);
        }

        $rowId = $validated['row_id'];
        $quantity = $validated['quantity'];
        $attributes = $validated['attributes'] ?? null;

        if (!Cart::get($rowId)) {
            return response()->json(['message' => 'Позицію в кошику не знайдено.'], 404);
        }

        if ($quantity === 0) {
            Cart::remove($rowId);
            $message = 'Позицію видалено з кошика.';
        } else {
            // Оновлюємо кількість
            Cart::update($rowId, [
                'quantity' => [
                    'relative' => false, // Встановлюємо точну кількість
                    'value' => $quantity,
                ],
            ]);

            // Якщо передано нові атрибути, оновлюємо їх також
            if ($attributes !== null) {
                // Darryldecode/cart переписує всі атрибути, якщо ви їх передаєте
                Cart::update($rowId, [
                    'attributes' => $attributes,
                ]);
            }
            $message = 'Кошик оновлено.';
        }

        return response()->json([
            'message' => $message,
            'cart' => $this->index()->original, // Повертаємо оновлений вміст кошика
        ]);
    }

    /**
     * Видаляє конкретну позицію з кошика за її 'row_id'.
     */
    public function destroy(string $rowId): JsonResponse
    {
        // Не використовуємо Request для row_id в URI, тому валідація не потрібна,
        // але перевірка існування позиції є гарною практикою.
        if (!Cart::get($rowId)) {
            return response()->json(['message' => 'Позицію в кошику не знайдено.'], 404);
        }

        Cart::remove($rowId);

        return response()->json([
            'message' => 'Позицію успішно видалено з кошика.',
            'cart' => $this->index()->original, // Повертаємо оновлений вміст кошика
        ]);
    }

    /**
     * Очищає весь кошик.
     */
    public function clear(): JsonResponse
    {
        Cart::clear();

        return response()->json([
            'message' => 'Кошик успішно очищено!',
            'cart' => $this->index()->original, // Повертаємо порожній кошик
        ]);
    }
}
