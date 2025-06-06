<?php

namespace App\Policies;

use App\Models\PostCategory;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostCategoryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('post_category-view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, PostCategory $postCategory): bool
    {
        return $user->hasPermissionTo('post_category-view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('post_category-create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, PostCategory $postCategory): bool
    {
        return $user->hasPermissionTo('post_category-update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, PostCategory $postCategory): bool
    {
        return $user->hasPermissionTo('post_category-delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, PostCategory $postCategory): bool
    {
        return $user->hasPermissionTo('post_category-update');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, PostCategory $postCategory): bool
    {
        return $user->hasPermissionTo('post_category-delete');
    }
}
