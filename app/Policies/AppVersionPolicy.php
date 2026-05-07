<?php

namespace App\Policies;

use App\Models\AppVersion;
use App\Models\User;

class AppVersionPolicy
{
    /**
     * Попередня перевірка: якщо користувач адмін, дозволяємо все.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return null; // Продовжити стандартну перевірку
    }

    /**
     * Перегляд списку версій.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('app_version-view');
    }

    /**
     * Перегляд конкретної версії.
     */
    public function view(User $user, AppVersion $appVersion): bool
    {
        return $user->can('app_version-view');
    }

    /**
     * Створення версії.
     */
    public function create(User $user): bool
    {
        return $user->can('app_version-create');
    }

    /**
     * Оновлення версії (включаючи перенесення завдань).
     */
    public function update(User $user, AppVersion $appVersion): bool
    {
        return $user->can('app_version-update');
    }

    /**
     * Видалення версії.
     */
    public function delete(User $user, AppVersion $appVersion): bool
    {
        return $user->can('app_version-delete');
    }

    /**
     * Для відновлення та остаточного видалення (якщо використовуєте SoftDeletes).
     */
    public function restore(User $user, AppVersion $appVersion): bool
    {
        return $user->can('app_version-update');
    }

    public function forceDelete(User $user, AppVersion $appVersion): bool
    {
        return $user->can('app_version-delete');
    }
}
