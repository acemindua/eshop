<?php

namespace App\Policies;

use App\Models\Page;
use App\Models\User;

class PagePolicy
{
    /**
     * Чи може користувач переглядати список методів оплати.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('page-view');
    }

    /**
     * Чи може користувач переглядати конкретний метод.
     */
    public function view(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('page-view');
    }

    /**
     * Чи може користувач створювати нові методи.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('page-create');
    }

    /**
     * Чи може користувач оновлювати метод.
     */
    public function update(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('page-update');
    }

    /**
     * Чи може користувач видаляти метод.
     */
    public function delete(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('page-delete');
    }

    /**
     * Відновлення та остаточне видалення поки відключаємо (як і в PagePolicy).
     */
    public function restore(User $user, Page $page): bool
    {
        return false;
    }

    public function forceDelete(User $user, Page $page): bool
    {
        return false;
    }
}
