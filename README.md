# Release v1.11.8

```bash
# translatable Brand:
php artisan make:model Brand -m
php artisan make:model BrandTranslation -m
php artisan make:controller Admin\Commerce\BrandController --model=Brand --resource --requests

php artisan make:resource BrandResource
php artisan make:policy BrandPolicy --model=Brand
php artisan make:seeder BrandSeeder
php artisan make:factory BrandFactory
```

# Release v1.11.7 🛒 E-commerce Catalog & Filtering System

Цей проєкт реалізує динамічну систему каталогу товарів з інтерактивною фільтрацією, що базується на **Laravel (Backend)** та **Vue.js / Inertia.js (Frontend)**.

---

## 🛠 Ключові можливості

### 1. Система динамічної фільтрації

- **Динамічні цінові межі:** Система автоматично розраховує мінімальні та максимальні ціни на основі результатів вибірки товарів.
- **Інтерактивний слайдер:** Використано `@vueform/slider` для зручного візуального вибору діапазону ціни.
- **Синхронізація з URL:** Стан фільтрів (промо, ціни, бренди) автоматично відображається в адресному рядку браузера. Користувачі можуть копіювати посилання на відфільтрований список.
- **Debounce-обробка:** Впроваджено затримку (500мс) перед відправкою запиту до API, що забезпечує плавну роботу інтерфейсу при перетягуванні повзунка.

### 2. API та Backend-логіка

- **Query Filtering:** Впроваджено патерн `QueryFilter`, що дозволяє легко додавати нові фільтри до Eloquent-запитів.
- **API Resources:** Використання `ItemResource` для стандартизації відповідей сервера. Додано обчислення динамічних даних (знижки, рейтинг, наявність).
- **Smart Routing (Resolve):** Налаштовано єдину точку входу для динамічних сторінок, яка автоматично розпізнає контент (Категорія, Товар або Page) за його `slug`.

### 3. Frontend-інтеграція

- **Динамічний стан:** Використання `ref`, `computed` та `watch` у Vue 3 для миттєвої реакції на дії користувача.
- **Стандарт завантаження:** Композабл `useApiResourceService` для стандартизованого керування станами `loading` та обробки помилок.
- **Адаптивний UI:** Розмітка на Tailwind CSS, оптимізована для мобільних пристроїв та десктопів.

---

## 🚀 Технологічний стек

| Сфера                | Технології                                  |
| :------------------- | :------------------------------------------ |
| **Backend**          | Laravel 10/11, Eloquent ORM                 |
| **Frontend**         | Vue 3 (Composition API), Inertia.js         |
| **UI**               | Tailwind CSS, `@vueform/slider`             |
| **SEO & Navigation** | Laravel Localization, Diglactic Breadcrumbs |

---

## 🏗 Архітектура потоку даних

Система працює за принципом **Faceted Search**:

1. **Користувач** взаємодіє з фільтрами у Vue-компоненті.
2. **Фронтенд** синхронізує стан параметрів з `window.history` для SEO.
3. **Запит** йде до API, який повертає відфільтровані дані (`items`) та оновлені межі фільтрації (`min_price`, `max_price`).
4. **Компоненти** Vue автоматично оновлюються завдяки реактивному зв'язку.

---

## 🔧 Як розширити?

- **Додавання фільтрів:** Додайте метод у `ItemFilter` (наприклад, для брендів або характеристик) та відповідний `input` у компонент `Catalog.vue`.
- **Додавання сортування:** Легко реалізується через розширення `ItemFilter` параметром `sort`.

# Release v1.11.6

## 🎨 Frontend Enhancements

- **Dynamic Price Formatting:** Integrated global `$formatPrice` plugin to ensure uniform currency representation across the storefront.
- **Visual Stability:** Optimized product card container height, preventing vertical layout shifts (CLS) when promotional prices are rendered.
- **Skeleton Loading:** Deployed lightweight `animate-pulse` loaders to enhance perceived performance during asynchronous component hydration.
- **Discount Intelligence:** Introduced a real-time calculated discount badge on images, highlighting promotional value to end-users.

**Release Date:** 2026.05.30  
**Target:** Core Media Management Engine & Form Accessibility Layer

This release focuses on global architectural refactoring of the polymorphic media management system (Laravel + Vue 3), removing recursive payload anomalies, optimizing database interaction, and achieving strict compliance with modern web accessibility (a11y) and security standards.

# Release v1.11.5 — Refactors Settings 🚀

---

## 🛠 What's Changed

### 🔄 Media Architecture & Backend Optimization (Laravel)

- **Strict Typing Ingestion:** Enforced `declare(strict_types=1);` across the full controller and service pipeline to eliminate implicit type-coercion bugs.
- **Mass Sequence Alignment:** Completely rewritten the `MediaService::sortMedia` method. Replaced slow, repetitive hydration loops (`SELECT` + `SAVE`) with atomic direct builder query executions (`where()->update()`), drastically lowering database overhead.
- **REST API Standardization:** Refactored unified JSON payload structures with standardized boolean success flags (`success`), explicit messaging (`message`), and encapsulated Data Transfer Objects (`data`).
- **Symfony HTTP Protocol Enforcement:** Swapped raw HTTP integer codes with descriptive semantic constants from `Symfony\Component\HttpFoundation\Response` (e.g., `HTTP_CREATED`, `HTTP_UNPROCESSABLE_ENTITY`).

### 🧪 Frontend Decoupling & UI Enhancements (Vue 3)

- **Destruction of Nested Payload Anomalies:** Fixed a critical bug in `MediaForm.vue` where structural metadata recursively wrapped around the layout payload. The sorting mechanism now safely delivers a pristine, flat array of numeric IDs (`[20, 19, 23...]`).
- **Reactive Upload Micro-Optimizations:** Replaced global array re-renders with atomic `.find()` pointer mutations during parallel file uploads, updating individual file progress markers instantly without blocking the UI thread.
- **Transient State Interceptors:** Enhanced thread safety by securing synchronous local item mapping during concurrent chunk streams using asynchronous cryptographic hashes (`temp-*`).

### ♿ Accessibility (a11y) & UX Compliance

- **Implicit Label Binding:** Resolved severe Lighthouse/DevTools accessibility violations by applying implicit nested element mapping on custom UI units (`<CountrySelect>`, `<ComboboxSelect>`).
- **Elimination of DOM ID Duplications:** Removed redundant explicit HTML `for` and `id` properties, expanding client click-target areas and securing native autofill configurations for assistive screen readers.
- **Tailwind Token Consolidation:** Audited and optimized inline CSS configurations, purging duplicate font-weight tokens (`font-semibold`) and improving design system predictability.

---

## 📦 Technical Details

### Backend Payload Cast Guard

Explicitly cast incoming query state metrics inside `MediaController` methods to match strict engine signatures:

```bash
$this->mediaService->getMedia(
    $validated['model_type'],
    (int) $validated['model_id'], // Enforced type-safety cast boundary
    $validated['collection']
);
```

### Refactors: (v1.11.3) - 2026.05.22

**Menu**
**_CKEditor_**
ckeditor-duplicated-modules

### Refactors: (v1.11.2) - 2026.05.21

**Admin/Users\***

### Update System: (v1.11.1) - 2026.05.19

--Translations
--Versions
--General
--Warehouses

### Update System (v1.11.0) - 2026.05.16

1.  **Оптимізація 'Settings'**

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

### Update System (v1.10.7) - 2026.05.13

### Update System (v1.10.8) - 2026.05.14

### Menu

```bash
php artisan make:model Menu -mcr
php artisan make:model MenuItem -m
php artisan make:policy MenuPolicy

npm i vuedraggable
```
