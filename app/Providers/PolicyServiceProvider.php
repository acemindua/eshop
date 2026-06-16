<?php

namespace App\Providers;

use App\Models\{
    AppVersion,
    Brand,
    Category,
    Item,
    Menu,
    Page,
    User,
    PaymentMethod,
    Shipping
};
use App\Policies\{
    AppVersionPolicy,
    BrandPolicy,
    CategoryPolicy,
    ItemPolicy,
    MenuPolicy,
    PagePolicy,
    UserPolicy,
    PaymentMethodPolicy,
    ShippingPolicy
};

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class PolicyServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-user') ? true : null;
        });

        Gate::policy(User::class, UserPolicy::class);
        Gate::policy(Category::class, CategoryPolicy::class);
        Gate::policy(Item::class, ItemPolicy::class);
        Gate::policy(Page::class, PagePolicy::class);
        Gate::policy(Brand::class, BrandPolicy::class);
        Gate::policy(PaymentMethod::class, PaymentMethodPolicy::class);
        Gate::policy(AppVersion::class, AppVersionPolicy::class);
        Gate::policy(Shipping::class, ShippingPolicy::class);
        Gate::policy(Menu::class, MenuPolicy::class);
    }
}
