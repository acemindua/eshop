<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Item;
use App\Models\Manufacturer;
use App\Models\Page;
use App\Models\User;
use App\Models\PaymentMethod; // Імпортуємо модель
use App\Policies\CategoryPolicy;
use App\Policies\ItemPolicy;
use App\Policies\ManufacturerPolicy;
use App\Policies\PagePolicy;
use App\Policies\UserPolicy;
use App\Policies\PaymentMethodPolicy; // Імпортуємо політику
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

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
        Gate::policy(Manufacturer::class, ManufacturerPolicy::class);

        // Реєструємо політику для методів оплати
        Gate::policy(PaymentMethod::class, PaymentMethodPolicy::class);
    }
}
