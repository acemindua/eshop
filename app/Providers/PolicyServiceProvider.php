<?php

// app/Providers/PolicyServiceProvider.php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\{User, Language, Category, Order, Product, Setting, Page, Post, PostCategory};
use App\Policies\{UserPolicy, LanguagePolicy, CategoryPolicy, OrderPolicy, ProductPolicy, SettingPolicy, PagePolicy, PostCategoryPolicy, PostPolicy};
use Spatie\Permission\Models\Role;
use App\Policies\RolePolicy;

class PolicyServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-user') ? true : null;
        });

        Gate::policy(User::class, UserPolicy::class);
        Gate::policy(Role::class, RolePolicy::class);
        Gate::policy(Language::class, LanguagePolicy::class);
        Gate::policy(Category::class, CategoryPolicy::class);
        Gate::policy(Order::class, OrderPolicy::class);
        Gate::policy(Product::class, ProductPolicy::class);
        Gate::policy(Setting::class, SettingPolicy::class);
        Gate::policy(Page::class, PagePolicy::class);
        Gate::policy(Post::class, PostPolicy::class);
        Gate::policy(PostCategory::class, PostCategoryPolicy::class);
    }
}
