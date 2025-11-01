<?php // routes/breadcrumbs.php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.

use App\Models\Page;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.

// Home
Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push(__('Home'), route('home'));
});

// Page show
Breadcrumbs::for('page.show', function (BreadcrumbTrail $trail, string $slug) {
    $trail->parent('home');
    $page = Page::whereTranslation('slug', $slug)->firstOrFail();

    $translation = $page->translations->first();
    $trail->push($page->title ?: $translation->title, route('page.show',  $page->slug ?: $translation->slug));
});


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

    Breadcrumbs::for("{$name}.edit", function (BreadcrumbTrail $trail, $model) use ($name) {
        $trail->parent("{$name}.index");
        $trail->push(__('Edit') . ': ' . ($model->title ?? $model->name ?? ''), route("{$name}.edit", $model));
    });
});

// Admin ресурси
$resources = [
    'pages' => __('Pages'),
    'users' => __('Users'),
];

foreach ($resources as $name => $title) {
    Breadcrumbs::resource("admin.{$name}", $title);
}
