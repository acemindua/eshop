<?php

namespace App\Services\Payments;

use App\Services\Payments\Drivers\MonoDriver;
use App\Services\Payments\Drivers\LiqPayDriver;
use App\Services\Payments\Drivers\CashDriver;
use Exception;

class PaymentManager
{
    /**
     * Повертає потрібний драйвер на основі коду
     */
    public function driver(string $code): PaymentDriverInterface
    {
        return match ($code) {
            'monobank' => new MonoDriver(),
            //'liqpay'   => new LiqPayDriver(),
            'cash'     => new CashDriver(),
            default    => throw new Exception("Драйвер для [{$code}] не знайдено."),
        };
    }
}
