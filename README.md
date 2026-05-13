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

### 8 E-Commerce

## 8.1 Categories

```bash
php artisan make:model Category -m
php artisan make:model CategoryTranslation -m
php artisan make:controller Admin/Commerce/CategoryController --model=Category --resource --requests
php artisan make:resource CategoryResource
php artisan make:policy CategoryPolicy --model=Category
php artisan make:seeder CategorySeeder
php artisan make:factory CategoryFactory
```

### 8.2 Products/Items

```bash
php artisan make:model Item -m
php artisan make:model ItemTranslation -m
php artisan make:controller Admin/Commerce/ItemController --model=Item --resource --requests
php artisan make:resource ItemResource
php artisan make:policy ItemPolicy --model=Item
php artisan make:seeder ItemSeeder
php artisan make:factory ItemFactory
```

### 2025.12.10.v0.8.3

## Options

```bash
php artisan make:model Option -m
php artisan make:seeder OptionSeeder
php artisan db:seed --class=OptionSeeder
php artisan make:provider SettingsServiceProvider
php artisan make:migration add_last_activity_to_users_table --table=users
php artisan make:middleware UserActivity
npm i vue-the-mask
npm install sweetalert2
```

### 0.12 MathType [https://www.npmjs.com/package/@wiris/mathtype-ckeditor5]

    ```bash
    npm install @ckeditor/ckeditor5-vue
    npm install @ckeditor/ckeditor5-ui @ckeditor/ckeditor5-core
    npm i @wiris/mathtype-ckeditor5
    ```

```bash
npm i floating-vue
npm i moment
```

### 2025.12.18.v0.9

```bash
php artisan make:model Manufacturer -m
php artisan make:controller Admin/Commerce/ManufacturerController --model=Manufacturer --resource --requests
php artisan make:resource ManufacturerResource
php artisan make:policy ManufacturerPolicy --model=Manufacturer
php artisan make:seeder ManufacturerSeeder
php artisan make:factory ManufacturerFactory
```

```bash
php artisan make:migration add_manufacturer_id_to_items_table
composer require rinvex/countries
```

### 2025.12.18.v10

```bash
composer require laravel/socialite
php artisan make:controller GoogleAuthController
```

### 2025.01.05.v10.1

```bash
php artisan make:controller Public/AccountController --model=User
npm i --save lodash
```

### 2025.01.29.v10.2

- npm i sortablejs

### 2025.02.05.v10.3

## SEO

```bash
npm install @vue/server-renderer
php artisan inertia:publish
php artisan vendor:publish --provider="Inertia\ServiceProvider"
```

### 2026.02.14.v11 Reviews

```bash
composer require codebyray/laravel-review-rateable

php artisan config:clear
php artisan route:clear
php artisan vendor:publish --provider="CodeByRay\ReviewRateable\ReviewRateableServiceProvider"
```

### 2026.02.18.v12 Orders

```bash
php artisan make:model Order -m
php artisan make:controller Admin/Commerce/OrderController --model=Order --resource --requests
php artisan make:resource OrderResource
php artisan make:policy OrderPolicy --model=Order
php artisan make:seeder OrderSeeder
php artisan make:factory OrderFactory

php artisan make:model OrderItem -m
```

### 2025.02.05.v10.2 BuyButton and Controllers

```bash
composer require darryldecode/cart

php artisan vendor:publish --provider="DarrylDecode\Cart\CartServiceProvider" --tag="config"

php artisan make:controller CartController
```

```bash
php artisan make:controller Admin/TranslationController
```

```bash
php artisan make:migration add_details_to_users_table --table=users
```

```bash
php artisan make:model Shipping -m
php artisan make:controller Admin/ShippingController --model=Shipping --resource --requests
php artisan make:resource ShippingResource
php artisan make:policy ShippingPolicy --model=Shipping
php artisan make:seeder ShippingSeeder
php artisan make:factory ShippingFactory


php artisan make:controller  Api/NovaPoshtaController
```

```bash
php artisan make:model PaymentMethod -m
php artisan make:model PaymentMethodTranslation -m
php artisan make:controller Admin/PaymentMethodController --model=PaymentMethod --resource --requests
php artisan make:resource PaymentMethodResource
php artisan make:policy PaymentMethodPolicy --model=PaymentMethod
php artisan make:seeder PaymentMethodSeeder
php artisan make:factory PaymentMethodFactory

```

### Timeline & Versioning System (v1.10.3) — 2026.05.07

- Roadmap

```bash
php artisan make:model AppVersion -m
php artisan make:controller Admin/Settings/AppVersionController --model=AppVersion --resource --requests
php artisan make:resource AppVersionResource
php artisan make:policy AppVersionPolicy --model=AppVersion
php artisan make:seeder AppVersionSeeder

php artisan db:seed --class=AppVersionSeeder

php artisan make:migration add_status_to_app_versions_table
```

### Orders (v1.10.4) - 2026.05.08

-- Warehouse

```bash
php artisan make:model Warehouse -m

php artisan make:controller Admin/Settings/WarehouseController --model=Warehouse --resource --requests
php artisan make:resource WarehouseResource
php artisan make:policy WarehousePolicy --model=Warehouse
php artisan make:seeder WarehouseSeeder
```

### Checkout (v1.10.5) - 2026.05.11

```bash

```

### Checkout->Delivery (v1.10.6) - 2026.05.13

```bash

```
