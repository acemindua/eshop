<?php

namespace App\Policies;

use App\Models\PaymentMethod;
use App\Models\User;

class PaymentMethodPolicy
{
    /**
     * Чи може користувач переглядати список методів оплати.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('payment-method-view');
    }

    /**
     * Чи може користувач переглядати конкретний метод.
     */
    public function view(User $user, PaymentMethod $paymentMethod): bool
    {
        return $user->hasPermissionTo('payment-method-view');
    }

    /**
     * Чи може користувач створювати нові методи.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('payment-method-create');
    }

    /**
     * Чи може користувач оновлювати метод.
     */
    public function update(User $user, PaymentMethod $paymentMethod): bool
    {
        return $user->hasPermissionTo('payment-method-update');
    }

    /**
     * Чи може користувач видаляти метод.
     */
    public function delete(User $user, PaymentMethod $paymentMethod): bool
    {
        return $user->hasPermissionTo('payment-method-delete');
    }

    /**
     * Відновлення та остаточне видалення поки відключаємо (як і в PagePolicy).
     */
    public function restore(User $user, PaymentMethod $paymentMethod): bool
    {
        return false;
    }

    public function forceDelete(User $user, PaymentMethod $paymentMethod): bool
    {
        return false;
    }
}
