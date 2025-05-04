<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('user-view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return $user->hasPermissionTo('user-view') || $user->id === $model->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('user-create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        // Якщо користувач не є суперюзером, але хоче редагувати суперюзера — забороняємо
        if (!$user->hasRole('super-user') && $model->hasRole('super-user')) {
            return false;
        }

        // Якщо користувач не є admin або super-user, але хоче редагувати admin — забороняємо
        if (!$user->hasAnyRole(['super-user', 'admin']) && $model->hasRole('admin')) {
            return false;
        }

        return $user->hasPermissionTo('user-update')
            || $user->id === $model->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        // Перевіряємо, чи має користувач дозвіл на видалення
        if (!$user->hasPermissionTo('user-delete')) {
            return false;
        }

        // Забороняємо видаляти самого себе
        if ($user->id === $model->id) {
            return false;
        }

        // Забороняємо видаляти супер-адміністраторів
        if ($model->hasRole('super-user')) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }
}
