<?php

use App\Models\Category;
use App\Models\Page;
use App\Models\Product;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Головна сторінка
Breadcrumbs::for(
    'home',
    fn(BreadcrumbTrail $trail) =>
    $trail->push(__('Home'), route('home'))
);

// Категорія
Breadcrumbs::for('category', function (BreadcrumbTrail $trail, string $slug) {
    $category = Category::whereTranslation('slug', $slug)->firstOrFail();

    if ($category->parent) {
        $trail->parent('category', $category->parent->slug);
    } else {
        $trail->parent('home');
    }

    $trail->push($category->title, route('category', $category->slug));
});

Breadcrumbs::for('dynamic.route', function (BreadcrumbTrail $trail, string $slug, ?string $optional = null) {


    // Спроба знайти продукт
    $product = Product::whereTranslation('slug', $slug)->first();
    if ($product) {
        $trail->parent('category', $product->category->slug);

        $title = $product->title;

        if ($optional) {
            $variant = $product->variants
                ->first(fn($v) => optional($v->attribute_value)->slug === $optional);

            if ($variant) {
                $title .= ' (' . $variant->attribute_value_title . ')';
            }
        }

        $trail->push($title, route('dynamic.route', [
            'slug' => $slug,
            'optional' => $optional,
        ]));

        return;
    }

    // Спроба знайти сторінку
    $page = Page::whereTranslation('slug', $slug)->first();
    if ($page) {
        $trail->parent('home');
        $trail->push($page->title, route('dynamic.route', [
            'slug' => $slug,
            'optional' => $optional,
        ]));

        return;
    }

    // Якщо нічого не знайдено — додати заглушку
    $trail->push(__('Not found'), '#');
});

// Продукт + варіант
Breadcrumbs::for('product.show', function (BreadcrumbTrail $trail, string $productSlug, ?string $variantSlug = null) {
    $product = Product::whereTranslation('slug', $productSlug)->firstOrFail();

    if ($variantSlug) {
        $variant = $product->variants
            ->first(fn($v) => optional($v->attribute_value)->slug === $variantSlug);

        if ($variant) {
            $product->title .= " ({$variant->attribute_value_title})";
        }
    }

    $trail->parent('category', $product->category->slug);
    $trail->push($product->title, route('product.show', [
        'productSlug' => $productSlug,
        'variantSlug' => $variantSlug
    ]));
});

// Admin-панель
Breadcrumbs::for(
    'admin.dashboard',
    fn(BreadcrumbTrail $trail) =>
    $trail->push(__('Dashboard'), route('admin.dashboard'))
);

Breadcrumbs::for(
    'admin.chat.rooms',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('admin.dashboard')->push(__('Messages'), route('admin.chat.rooms'))
);

// Автоматичне створення ресурсних ланцюжків
Breadcrumbs::macro('resource', function (string $name, string $title) {
    Breadcrumbs::for(
        "{$name}.index",
        fn(BreadcrumbTrail $trail) =>
        $trail->parent('admin.dashboard')->push($title, route("{$name}.index"))
    );

    Breadcrumbs::for(
        "{$name}.create",
        fn(BreadcrumbTrail $trail) =>
        $trail->parent("{$name}.index")->push(__('New'), route("{$name}.create"))
    );

    Breadcrumbs::for("{$name}.edit", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index");
        $trail->push(__('Edit') . ': ' . ($model->title ?? $model->name ?? ''), route("{$name}.edit", $model));
    });
});

// Admin ресурси
$resources = [
    'pages' => __('Pages'),
    'users' => __('Users'),
    'orders' => __('Orders'),
    'categories' => __('Categories'),
    'products' => __('Products'),
    'manufacturers' => __('Manufacturers'),
    'attributes' => __('Attributes'),
    'options' => __('Options'),
    'settings' => __('Settings'),
    'messengers' => __('Messengers'),
    'roles' => __('Roles'),
    'languages' => __('Languages'),
];

foreach ($resources as $name => $title) {
    Breadcrumbs::resource("admin.{$name}", $title);
}
