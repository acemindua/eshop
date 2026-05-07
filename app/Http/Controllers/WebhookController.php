<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PaymentMethod;
use App\Services\Payments\PaymentManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function handle(string $code, Request $request, PaymentManager $paymentManager)
    {
        // 1. Знаходимо метод оплати в базі за кодом
        $method = PaymentMethod::where('code', $code)->first();

        if (!$method) {
            Log::error("Webhook Error: Method [{$code}] not found.");
            return response()->json(['message' => 'Method not found'], 404);
        }

        try {
            // 2. Отримуємо драйвер через наш менеджер
            $driver = $paymentManager->driver($code);

            // 3. Просимо драйвер розшифрувати статус (success, failure і т.д.)
            $status = $driver->getStatus($request->all(), $method->settings);

            // 4. Шукаємо замовлення (банки зазвичай передають ID у reference або invoiceId)
            // Для Mono це зазвичай в $request->all()['data']['object']['reference']
            // Але для чистоти ми можемо передати це драйверу, щоб він витягнув ID замовлення
            $orderId = $request->input('reference') ?? $request->input('data.object.reference');
            $order = Order::find($orderId);

            if ($order) {
                if ($status === 'success') {
                    $order->update(['status' => 'paid']);
                    // Тут можна додати: Notification::send($order->user, new OrderPaid($order));
                } elseif ($status === 'failure') {
                    $order->update(['status' => 'payment_failed']);
                }
            }

            return response()->json(['status' => 'ok']);
        } catch (\Exception $e) {
            Log::error("Webhook Processing Error [{$code}]: " . $e->getMessage());
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
