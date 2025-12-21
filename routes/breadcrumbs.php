<?php // routes/breadcrumbs.php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.

use App\Models\Category;
use App\Models\Item;
use App\Models\Page;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.

// Home
Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push(__('Home'), route('home'));
});

// Category show
Breadcrumbs::for('category.show', function (BreadcrumbTrail $trail, string $slug) {

    // 1. Оскільки ви шукаєте категорію за slug, приберіть префікс, якщо він є.
    // Якщо slug вже чистий, str_replace нічого не змінить.
    $categorySlug = str_replace('category__', '', $slug);

    // Знаходимо поточну категорію
    $category = Category::whereTranslation('slug', $categorySlug)->firstOrFail();

    // Translation зазвичай містить slug і title
    $translation = $category->translations->first();

    // 2. Рекурсивний виклик батьківської категорії
    if ($category->parent) {
        // Якщо батько існує, викликаємо цей же маршрут, 
        // але передаємо SLUG БАТЬКІВСЬКОЇ КАТЕГОРІЇ.
        // Припускаємо, що батьківська категорія має власну трансляцію з коректним slug.
        $parentSlug = $category->parent->translations->first()->slug;

        // Рекурсивний виклик
        $trail->parent('category.show', $parentSlug);
    } else {
        // Якщо це категорія верхнього рівня, повертаємося до головної сторінки
        $trail->parent('home');
    }


    // 3. Додавання поточної категорії
    // Використовуємо title і slug поточної категорії (з об'єкта $category або $translation)
    $title = $category->title ?? $translation->title;
    $slugToUse = $category->slug ?? $translation->slug;

    $trail->push($title, route('category.show', $slugToUse));
});
Breadcrumbs::for(
    'page.show',
    function (BreadcrumbTrail $trail, string $slug) {
        // Item
        if ($item = Item::whereTranslation('slug', $slug)->first()) {


            // Translation зазвичай містить slug і title
            $translation = $item->translations->first();
            $title = $item->title ?? $translation->title;

            if ($item->category) {
                $trail->parent('category.show', $item->category->slug);
            } else {
                $trail->parent('home');
            }

            $trail->push($title, route('page.show',  $slug));
        }
        // Page
        elseif ($page = Page::whereTranslation('slug', $slug)->first()) {


            $trail->parent('home');
            // Translation зазвичай містить slug і title
            $translation = $page->translations->first();
            $title = $page->title ?? $translation->title;
            $trail->push($title, route('page.show',  $slug));
        } else {
            $trail->parent('home');
            $trail->push($slug, route('page.show',  $slug));
        }
    }
);

// Dashboard
Breadcrumbs::for('admin.dashboard', function (BreadcrumbTrail $trail) {
    $trail->push("Dashboard", route('admin.dashboard'));
});
// Settings
Breadcrumbs::for('admin.settings', function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard');
    $trail->push(__("Settings"), route('admin.settings'));
});

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

    Breadcrumbs::for("{$name}.show", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index");
        $trail->push(($model->title ?? $model->name ?? ''), route("{$name}.edit", $model));
    });

    Breadcrumbs::for("{$name}.edit", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index");
        $trail->push(__('Edit') . ': ' . ($model->title ?? $model->name ?? ''), route("{$name}.edit", $model));
    });
});

// Admin ресурси
$resources = [
    'pages' => __('Pages'),
    'users' => __('Users'),
    'categories'            => __('Categories'),
    'items'                 => __('Items'),
    'manufacturers'         => __('Manufacturers'),
];

foreach ($resources as $name => $title) {
    Breadcrumbs::resource("admin.{$name}", $title);
}
