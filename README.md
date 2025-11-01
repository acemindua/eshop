# 🚀 Project Setup and Package Installation Guide

Цей посібник містить детальні кроки для налаштування проекту та встановлення ключових Laravel-пакетів для **управління дозволами (Permissions), медіа-бібліотекою (Media Library)** та **локалізації (Localization)**.

---

## 🛠️ 1. Початкове Налаштування та Залежності

Ці кроки є основними для підготовки середовища та компіляції фронтенд-активів.

### 1.1. Встановлення PHP та JS Залежностей

1.  **Встановити PHP (Composer) залежності:**
    ```bash
    composer install
    ```
2.  **Оновити Vite Vue-плагін** (якщо необхідно):
    ```bash
    npm install @vitejs/plugin-vue@latest
    ```
3.  **Встановити JavaScript/CSS (NPM) залежності:**
    ```bash
    npm install
    # Використовуйте --force лише при помилках залежностей:
    # npm install --force
    ```

### 1.2. Компіляція Активів

1.  **Фінальна збірка (Production Build):**
    ```bash
    npm run build
    ```
2.  **Режим розробки (Development, Опціонально):**
    Запускайте в окремому терміналі, якщо вносите **фронтенд-зміни**.
    ```bash
    npm run dev
    ```

---

## 🔐 2. Налаштування Дозволів (Spatie Laravel Permission)

### 2.1. Встановлення та Міграція

1.  **Встановити пакет:**
    ```bash
    composer require spatie/laravel-permission
    ```
2.  **Опублікувати Міграцію та Конфігурацію:**
    ```bash
    php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
    ```
3.  **Очистити кеш конфігурації:**
    ```bash
    php artisan optimize:clear
    ```
4.  **Запустити міграції:**
    ```bash
    php artisan migrate
    ```

### 2.2. Налаштування Моделі та Gate

1.  **Додати Trait до `User` моделі:**
    Додайте `use Spatie\Permission\Traits\HasRoles;` та `HasRoles` до масиву traits у `App\Models\User.php`.
2.  **Визначити Super-Admin Gate (Рекомендовано):**
    Додайте цей код у метод `boot()` вашого **`AppServiceProvider.php`** (або `AuthServiceProvider.php`):
    ```php
    use Illuminate\Support\Facades\Gate;
    // ...
    public function boot(): void
    {
        // Надати ролі "super-user" усі дозволи
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-user') ? true : null;
        });
    }
    ```
3.  **Реєстрація Middleware (Laravel 11+):**
    Додайте alias-и у `bootstrap/app.php` у `withMiddleware` closure:
    ```php
    // У bootstrap/app.php ->withMiddleware(...)
    $middleware->alias([
        // ...
        'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
        'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
        'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
    ]);
    ```

---

## 🖼️ 3. Laravel Media Library (Spatie)

1.  **Встановити пакет:**
    ```bash
    composer require "spatie/laravel-medialibrary"
    ```
2.  **Опублікувати Міграцію:**
    ```bash
    php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
    ```
3.  **Запустити міграції:**
    ```bash
    php artisan migrate
    ```
4.  **Створити Storage Symlink:**
    ```bash
    php artisan storage:link
    ```

---

## 🌍 4. Налаштування Локалізації (Localization)

### 4.1. Astrotomic/laravel-translatable (Переклад Моделей)

1.  **Встановити пакет:**
    ```bash
    composer require astrotomic/laravel-translatable
    ```
2.  **Опублікувати Конфігурацію:**
    ```bash
    php artisan vendor:publish --tag=translatable
    ```

### 4.2. Mcamara/laravel-localization (Локалізація Маршрутів)

1.  **Встановити пакет:**
    ```bash
    composer require mcamara/laravel-localization
    ```
2.  **Опублікувати Конфігурацію:**
    ```bash
    php artisan vendor:publish --provider="Mcamara\LaravelLocalization\LaravelLocalizationServiceProvider"
    ```
3.  **Реєстрація Middleware (Laravel 11+):**
    Додайте необхідні `LaravelLocalization` middleware alias-и до `bootstrap/app.php` у `withMiddleware` closure.

### 4.3. Laravel-Lang/Common (Мовні Файли)

1.  **Встановити пакет:**
    ```bash
    composer require laravel-lang/common
    ```
2.  **Додати нові локалі** (наприклад, uk, ru, pl):
    ```bash
    php artisan lang:add uk ru pl
    ```
3.  **Оновити мовні файли:**
    ```bash
    php artisan lang:update
    ```

---

## 5. Створення початкових Користувачів та Ролей (Seeding)

1.  **Створити Seeder:**
    ```bash
    php artisan make:seeder RolesAndPermissionsSeeder
    ```
2.  **Запуск Міграції з Seeder-ом:**
    ```bash
    php artisan migrate:fresh --seed
    ```

> **Примітка:** Не забудьте додати код для створення ролей/дозволів/користувача у метод `run()` вашого `RolesAndPermissionsSeeder.php` (див. попередній крок).

---

## 6. Базові Компоненти та Контролери

### 6.1. Створення Контролерів та Ресурсів

```bash
# Базові контролери
php artisan make:controller Admin\DashboardController
php artisan make:controller Public\HomeController
php artisan make:controller LocaleSwitcherController

# Контролер для управління користувачами (CRUD)
php artisan make:controller Admin\UserController --model=User --resource --requests
php artisan make:resource UserResource

# Політика для User-моделі
php artisan make:provider PolicyServiceProvider
php artisan make:policy UserPolicy --model=User
```

### 6.2. Встановлення Фронтенд-Пакетів

```bash
# i18n для Vue
npm i laravel-vue-i18n

# Іконки
npm i @tabler/icons-vue

# UI/UX компоненти (наприклад, Dropdown Menu)
npm install @headlessui/vue

# Прапорці для перемикача локалі
npm i --save vue-flag-icon
```

## 7. Створення сторінок

### 7.1 Створення Моделі та Міграції

```bash
# translatable Page:
php artisan make:model Page -m
php artisan make:model PageTranslation -m
php artisan make:controller Admin\PageController --model=Page --resource --requests
```

### 7.2 Laravel-breadcrumbs [Instruction](https://velog.io/@corean/Laravel-9-inertia-1.0-breadcrumbs)

```bash
composer require diglactic/laravel-breadcrumbs
composer require robertboes/inertia-breadcrumbs
php artisan vendor:publish --tag="inertia-breadcrumbs-config"
```

### 7.3 Pages

```bash
php artisan make:resource PageResource
php artisan make:policy PagePolicy --model=Page
php artisan make:seeder PageSeeder
php artisan make:factory PageFactory
npm i lodash.debounce
```

### 7.4 Api

```bash
php artisan install:api
```

```bash
npm i pinia
```

```bash
php artisan make:controller  Api/HelpMainController
```