<?php

namespace App\Services\Payments\Drivers;

use App\Services\Payments\PaymentDriverInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MonoDriver implements PaymentDriverInterface
{
    private const API_URL = 'https://api.monobank.ua/api/merchant/invoice/create';

    public function createInvoice($order, array $settings): string
    {
        // 1. Готуємо дані для Mono
        // Налаштування $settings['api_token'] ми отримаємо з нашої адмінки Ace Admin
        $payload = [
            'amount' => (int) round($order->total * 100), // Конвертуємо в копійки
            'ccy' => 980, // Код гривні (UAH)
            'merchantPaymInfo' => [
                'reference' => (string) $order->id,
                'destination' => "Оплата замовлення #" . $order->id,
            ],
            'redirectUrl' => route('payment.success', ['order_id' => $order->id]),
            'webhookUrl' => route('payment.webhook', ['code' => 'monobank']),
        ];

        // 2. Робимо запит до банку
        $response = Http::withHeaders([
            'X-Token' => $settings['api_token'] ?? '',
        ])->post(self::API_URL, $payload);

        // 3. Перевіряємо результат
        if ($response->failed()) {
            Log::error('Monobank API Error', [
                'order_id' => $order->id,
                'response' => $response->body()
            ]);
            throw new \Exception("Помилка Monobank: " . ($response->json()['errText'] ?? 'Unknown error'));
        }

        // 4. Повертаємо посилання на сторінку оплати (Checkout Page)
        return $response->json()['pageUrl'];
    }

    public function getStatus(array $payload, array $settings): string
    {
        // Монобанк присилає статус замовлення в основному масиві або в data
        $status = $payload['status'] ?? ($payload['data']['status'] ?? null);

        return match ($status) {
            'success' => 'success',
            'error', 'failure' => 'failure',
            default => 'pending',
        };
    }
}
