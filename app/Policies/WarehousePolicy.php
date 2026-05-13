<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Auth\Access\HandlesAuthorization;

class WarehousePolicy
{
    use HandlesAuthorization;

    /**
     * Перегляд списку складів.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('warehouse-view');
    }

    /**
     * Перегляд конкретного складу.
     */
    public function view(User $user, Warehouse $warehouse): bool
    {
        // Якщо в майбутньому склад має бути публічним на сайті, 
        // тут можна додати логіку як у твоєму прикладі з Item ($warehouse->public)
        return $user->hasPermissionTo('warehouse-view');
    }

    /**
     * Створення складу.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('warehouse-create');
    }

    /**
     * Оновлення даних складу.
     */
    public function update(User $user, Warehouse $warehouse): bool
    {
        return $user->hasPermissionTo('warehouse-update');
    }

    /**
     * Видалення складу.
     */
    public function delete(User $user, Warehouse $warehouse): bool
    {
        return $user->hasPermissionTo('warehouse-delete');
    }

    /**
     * Відновлення (не використовується, якщо немає SoftDeletes).
     */
    public function restore(User $user, Warehouse $warehouse): bool
    {
        return false;
    }

    /**
     * Остаточне видалення.
     */
    public function forceDelete(User $user, Warehouse $warehouse): bool
    {
        return false;
    }
}
