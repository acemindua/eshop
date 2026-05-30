<?php

use App\Models\Category;
use App\Models\Item;
use App\Models\Page;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// --- FRONTEND BREADCRUMBS ---

// Home
Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push(__('Home'), route('home'));
});

// Category Show
Breadcrumbs::for('category.show', function (BreadcrumbTrail $trail, string $slug) {
    $categorySlug = str_replace('category__', '', $slug);
    $category = Category::whereTranslation('slug', $categorySlug)->firstOrFail();
    $translation = $category->translations->first();

    if ($category->parent) {
        $parentSlug = $category->parent->translations->first()->slug;
        $trail->parent('category.show', $parentSlug);
    } else {
        $trail->parent('home');
    }

    $title = $category->title ?? $translation->title;
    $slugToUse = $category->slug ?? $translation->slug;

    $trail->push($title, route('category.show', $slugToUse));
});

// Dynamic Page / Product Show
Breadcrumbs::for('page.show', function (BreadcrumbTrail $trail, string $slug) {
    // Item Route Handler
    if ($item = Item::whereTranslation('slug', $slug)->first()) {
        $translation = $item->translations->first();
        $title = $item->title ?? $translation->title;

        if ($item->category) {
            $trail->parent('category.show', $item->category->slug);
        } else {
            $trail->parent('home');
        }

        $trail->push($title, route('page.show', $slug));
    }
    // Static Page Route Handler
    elseif ($page = Page::whereTranslation('slug', $slug)->first()) {
        $trail->parent('home');
        $translation = $page->translations->first();
        $title = $page->title ?? $translation->title;
        $trail->push($title, route('page.show', $slug));
    }
    // Fallback Handler
    else {
        $trail->parent('home');
        $trail->push($slug, route('page.show', $slug));
    }
});

// --- ADMIN PANEL BREADCRUMBS ---

// Dashboard
Breadcrumbs::for('admin.dashboard', function (BreadcrumbTrail $trail) {
    $trail->push(__('Dashboard'), route('admin.dashboard'));
});

// Global Resource Macro for Backend Routes
Breadcrumbs::macro('resource', function (string $name, string $title, string $parent = 'admin.dashboard') {
    Breadcrumbs::for(
        "{$name}.index",
        fn(BreadcrumbTrail $trail) =>
        $trail->parent($parent)->push($title, route("{$name}.index"))
    );

    Breadcrumbs::for(
        "{$name}.create",
        fn(BreadcrumbTrail $trail) =>
        $trail->parent("{$name}.index")->push(__('New'), route("{$name}.create"))
    );

    Breadcrumbs::for("{$name}.edit", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index")
            ->push(__('Edit') . ': ' . ($model->title ?? $model->name ?? ''), route("{$name}.edit", $model));
    });

    Breadcrumbs::for("{$name}.show", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index")
            ->push($model->title ?? $model->name ?? '', route("{$name}.show", $model));
    });
});

// Standalone Admin Resources
Breadcrumbs::resource('admin.pages', __('Pages'));
Breadcrumbs::resource('admin.users', __('Users'));
Breadcrumbs::resource('admin.menus', __('Menus'));
// Settings Option Group Root
Breadcrumbs::for('admin.settings.options', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard')->push(__('Settings'), route('admin.settings.options'));
});

// Settings Resources Loop
$settingsResources = [
    // Core settings
    'versions'                 => __('App Roadmap & Versions'),
    'translations'             => __('Translations'),


];

foreach ($settingsResources as $name => $title) {
    Breadcrumbs::resource("admin.settings.{$name}", $title, 'admin.settings.options');
}

// Commerce Resources Loop
$commerceResources = [
    'items'         => __('Items'),
    'categories'    => __('Categories'),
    'manufacturers' => __('Manufacturers'),
    'orders'        => __('Orders'),
    // Commerce settings
    'shippings'       => __('Shippings'),
    'payment-methods' => __('Payment Methods'), // Fixed missing dot separator
    'warehouses'      => __('Warehouses'),
];

foreach ($commerceResources as $name => $title) {
    Breadcrumbs::resource("admin.commerce.{$name}", $title);
}
