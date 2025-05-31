<?php

use App\Models\Category;
use App\Models\Page;
use App\Models\Product;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;


// Home page
Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $page = Page::find(1);

    $trail->push(
        $page->title ?? __('Home'),
        route('home')
    );
});

// Search page
Breadcrumbs::for('search', function (BreadcrumbTrail $trail) {
    $trail->parent('home');
    $trail->push(
        __('Search'),
        route('search')
    );
});

// Категорія
Breadcrumbs::for('category', function (BreadcrumbTrail $trail, string $slug) {
    $categorySlug = str_replace('category__', '', $slug);
    $category = Category::where('slug', $categorySlug)->firstOrFail();

    if ($category->parent) {
        $trail->parent('category', $category->parent->slug);
    } else {
        $trail->parent('home');
    }

    $trail->push($category->title, route('category', $category->slug));
});

Breadcrumbs::for('dynamic.route', function (BreadcrumbTrail $trail, string $slug, ?string $optional = null) {
    // Спроба знайти продукт
    $product = Product::where('slug', $slug)->first();
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
    $page = Page::where('slug', $slug)->first();
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

// Admin-панель
Breadcrumbs::for(
    'admin.dashboard',
    fn(BreadcrumbTrail $trail) =>
    $trail->push('Dashboard', route('admin.dashboard'))
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
    'posts' => __('Posts'),
    'post-categories' => __('Post categories'),
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
