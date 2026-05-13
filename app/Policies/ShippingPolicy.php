<?php

namespace App\Policies;

use App\Models\Shipping;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShippingPolicy
{
    use HandlesAuthorization;

    /**
     * Перегляд списку методів доставки.
     */
    public function viewAny(User $user): bool
    {
        // Дозволяємо перегляд адмінам або менеджерам налаштувань
        return $user->hasPermissionTo('shipping-view');
    }

    /**
     * Перегляд конкретного методу.
     */
    public function view(User $user, Shipping $shipping): bool
    {
        return $user->hasPermissionTo('shipping-view');
    }

    /**
     * Створення нового методу доставки.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('shipping-create');
    }

    /**
     * Оновлення налаштувань доставки (API ключі, ціни).
     */
    public function update(User $user, Shipping $shipping): bool
    {
        return $user->hasPermissionTo('shipping-update');
    }

    /**
     * Видалення методу доставки.
     */
    public function delete(User $user, Shipping $shipping): bool
    {
        return $user->hasPermissionTo('shipping-delete');
    }

    /**
     * Відновлення (якщо додаси SoftDeletes).
     */
    public function restore(User $user, Shipping $shipping): bool
    {
        return $user->hasPermissionTo('shipping-update');
    }

    /**
     * Остаточне видалення.
     */
    public function forceDelete(User $user, Shipping $shipping): bool
    {
        return $user->hasPermissionTo('shipping-delete');
    }
}
