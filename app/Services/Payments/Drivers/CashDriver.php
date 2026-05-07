<?php

namespace App\Services\Payments\Drivers;

use App\Services\Payments\PaymentDriverInterface;

class CashDriver implements PaymentDriverInterface
{
    public function createInvoice($order, array $settings): string
    {
        // Для готівки нам не треба посилання на банк.
        // Ми просто відправляємо юзера на сторінку успішного оформлення.
        return route('order.complete', ['order_id' => $order->id]);
    }

    public function getStatus(array $payload, array $settings): string
    {
        // Готівка зазвичай має статус "очікує" до моменту отримання товару
        return 'pending';
    }
}
