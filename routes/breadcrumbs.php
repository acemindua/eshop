<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;


// Головна сторінка
Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push(__('Home'), route('home'));
});

// Категорія
Breadcrumbs::for('category', function (BreadcrumbTrail $trail, string $slug) {
    $category = Category::whereTranslation('slug', $slug)->first();
    if (isset($category->parent)) {
        $trail->parent('category', $category->parent->slug);
    } else {
        $trail->parent('home');
    }

    $trail->push($category->title, route('category', $category->slug));
});


Breadcrumbs::for(
    'product.show',
    function (BreadcrumbTrail $trail, string $slug, int $id) {
        $product = Product::whereTranslation('slug', $slug)->first();

        if (!$product) { // Перевірка на null, якщо продукт не знайдений
            $variant = ProductVariant::where('slug', $slug)->first();

            if ($variant) { // Перевірка, чи існує варіант
                $product = $variant->product; // Отримуємо продукт через варіант

                // Оновлюємо атрибут 'title' з додатковою інформацією
                $product->title = $product->title . " (" . $variant->attribute_value_title . ")";
                $product->slug = $variant->slug;
            }
        }
        // Передаємо категорію як об'єкт
        $category = Category::find($product->category->id);
        $trail->parent('category', $category->slug);
        $trail->push(
            $product->title,
            route('product.show', compact('id', 'slug'))
        );
    }
);

// Dashboard
Breadcrumbs::for('admin.dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Dashboard', route('admin.dashboard'));
});

// Chats
Breadcrumbs::for("admin.chat.rooms", function (BreadcrumbTrail $trail) {
    $trail->parent('admin.dashboard');
    $trail->push(__('Messages'), route("admin.chat.rooms"));
});

Breadcrumbs::macro('resource', function (string $name, string $title) {
    // Index
    Breadcrumbs::for("{$name}.index", function (BreadcrumbTrail $trail) use ($name, $title) {
        $trail->parent('admin.dashboard');
        $trail->push($title, route("{$name}.index"));
    });

    // New
    Breadcrumbs::for("{$name}.create", function (BreadcrumbTrail $trail) use ($name) {
        $trail->parent("{$name}.index");
        $trail->push(__('New'), route("{$name}.create"));
    });

    /*  // Show (для деталізації)
    Breadcrumbs::for("{$name}.show", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index");
        $trail->push($model->title ?? $model->name, route("{$name}.show", $model));
    }); */

    // Edit
    Breadcrumbs::for("{$name}.edit", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index", $model);
        $title = $model->title ?? $model->name ?? "";
        $trail->push(__('Edit') . ': ' . $title, route("{$name}.edit", $model));
    });
});

// Реєструємо ресурси
Breadcrumbs::resource('admin.users', __('Users'));
Breadcrumbs::resource('admin.orders', __('Orders'));
Breadcrumbs::resource('admin.categories', __('Categories'));
Breadcrumbs::resource('admin.products', __('Products'));
Breadcrumbs::resource('admin.manufacturers', __('Manufacturers'));
Breadcrumbs::resource('admin.roles', __('Roles'));
Breadcrumbs::resource('admin.languages', __('Languages'));
Breadcrumbs::resource('admin.attributes', __('Attributes'));
