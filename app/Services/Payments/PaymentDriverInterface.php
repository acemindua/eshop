<?php

namespace App\Services\Payments;

interface PaymentDriverInterface
{
    /**
     * Створити рахунок та отримати URL для оплати
     */
    public function createInvoice($order, array $settings): string;

    /**
     * Перевірити статус оплати (наприклад, для Webhook)
     */
    public function getStatus(array $payload, array $settings): string;
}
