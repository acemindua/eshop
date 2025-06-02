## API Податкова

## Install

-   npm install
-   composer install
-   php artisan optimize:clear
-   composer run dev
-   npm run dev
-   php artisan reverb:start --debug
-   php artisan storage:link
-   composer install --optimize-autoloader --no-dev

## Laravel Octane (для максимуму)

-   composer require laravel/octane
-   php artisan octane:install
-   php artisan octane:start

## v3 Shoping Cart

-   composer require darryldecode/cart
-   php artisan vendor:publish --provider="Darryldecode\Cart\CartServiceProvider" --tag="config"
-   php artisan make:controller \App\Http\Controllers\App\Commerce\CartController --resource

## v2 Blog

-   php artisan make:model PostCategory -m
-   php artisan make:model PostCategoryTranslation -m
-   php artisan make:controller \App\Http\Controllers\App\Blog\PostCategoryController --model=PostCategory --resource --requests

-   php artisan make:model Post -m
-   php artisan make:model PostTranslation -m
-   php artisan make:controller \App\Http\Controllers\App\Blog\PostController --model=Post --resource --requests

-   php artisan make:resource PostResource
-   php artisan make:resource PostCategoryResource

-   php artisan make:factory PostCategoryFactory --model=PostCategory
-   php artisan make:factory PostFactory --model=Post

-   php artisan make:seeder CategoryAndPostSeeder

-   php artisan make:policy PostPolicy --model=Post
-   php artisan make:policy PostCategoryPolicy --model=PostCategory

## v1.14 Corporate Themes

-   Logo

## v1.13.01 Review and Rating

## v1.13 Review and Rating

-   composer require codebyray/laravel-review-rateable

-   php artisan vendor:publish --provider="Codebyray\ReviewRateable\ReviewRateableServiceProvider" --tag=config
-   php artisan vendor:publish --provider="Codebyray\ReviewRateable\ReviewRateableServiceProvider" --tag=migrations
-   php artisan migrate

-   php artisan make:controller API/ReviewController --resource --api

## v1.12 Desing Hopme page

-   New SearchHeader
-   npm install @jamescoyle/vue-icon
-   npm install @mdi/js
-   responsive Main/Header
-   npm install @mdi/light-js @jamescoyle/vue-icon

## v1.11.04 Оптимізація SPA Layout в Inertia.js + Vue 3

## v1.11.03 Оптимізація SPA Layout в Inertia.js + Vue 3

## v1.11.02 Оптимізація SPA Layout в Inertia.js + Vue 3

## v1.11.01 Оптимізація SPA Layout в Inertia.js + Vue 3

## v1.11.00 SEO

## v1.10.00 Оптимізація SPA Layout в Inertia.js + Vue 3

## v1.09.00 Optimize translatable

-   php artisan make:provider LocalesServiceProvider

## v1.08.00 SettingsServiceProvider

-   php artisan make:provider SettingsServiceProvider

```
public function boot()
{
    if (Schema::hasTable('settings')) {
    $settings = \App\Models\Setting::all()->pluck('value', 'key')->toArray();
        config(['settings' => $settings]);
    }
}
```

config('settings.products_per_page'); // поверне 12

## v1.07.00 Pages & Optimize Policy

1.

-   php artisan make:model Page -m
-   php artisan make:model PageTranslation -m
-   php artisan make:controller \App\Http\Controllers\App\PageController --model=Page --resource --requests
-   php artisan make:policy PagePolicy --model=Page
-   php artisan make:seeder PageSeeder
-   php artisan make:resource PageResource
-   php artisan make:factory PageFactory --model=Page

2.

-   php artisan make:provider PolicyServiceProvider
-   composer require fakerphp/faker --dev

## v1.06.00 SEO-теги у Vue 3 + Inertia

-   rm -rf node_modules
-   rm package-lock.json # або yarn.lock
-   npm cache clean --force
-   npm install
-   npm install @vueuse/head

## v1.05.00 Api Data Controller

-   php artisan make:controller API\V1\DataController --api

## v1.04.00 App Settings

-   php artisan make:model Setting -m
-   php artisan make:controller \App\Http\Controllers\App\Settings\SettingController --model=Setting --resource
-   php artisan make:policy SettingPolicy --model=Setting
-   php artisan make:seeder SettingsSeeder
-   php artisan make:resource SettingResource

## v1.03.00 Options Product

-   php artisan make:model Option -m
-   php artisan make:model OptionTranslation -m
-   php artisan make:controller \App\Http\Controllers\App\Commerce\OptionController --model=Option --resource --requests
-   php artisan make:resource OptionResource

## v1.02.01 Messenger

-   php artisan make:model Messenger -m
-   php artisan make:controller \App\Http\Controllers\App\Settings\MessengerController --model=Messenger --resource --requests

## v1.02.00 Chat Rooms -> Telegram

-   mpm install --save-dev laravel-echo pusher-js
-   composer require irazasyed/telegram-bot-sdk
-   php artisan vendor:publish --tag="telegram-config"
-   php artisan make:controller API\ChatRooms\TelegramController --model=Message --resource --api

## v1.01.06 MediaController

-   php artisan make:controller API\MediaController --model=Media --resource --api
-   npm i sweetalert2

## v1.01.04 Telescope

[Telescope](https://laravel.com/docs/12.x/telescope)

-   composer require laravel/telescope
-   php artisan telescope:install

-   php artisan migrate

## v1.01.03 Attribute Values

-   php artisan make:controller API\AttributeController --model=Attribute --resource --api

## v1.01.02 Chat Update

## v1.01.01 Update Layout

-   npm i lodash.debounce
-   composer require rinvex/countries

## v1.01.00 Chat Laravel Reverb (websocket)

-   php artisan make:controller \App\Http\Controllers\App\TelegramController
-   php artisan install:broadcasting
-   php artisan reverb:start --debug
-   php artisan make:model -m Message
-   php artisan make:controller API\MessageController --model=Message --resource --requests --api
-   php artisan make:event MessageEvent

## v1.00.26

-   php artisan make:controller API\ProductVariantController --model=ProductVariant --resource --api

## v1.00.25 Images Collections Product

-   npm i sortablejs
-   npm i swiper
-   php artisan make:controller API/ProductMediaController --model=Product --resource --api

## v1.00.24 Product Variants & Attributes

-   php artisan make:model Attribute -m
-   php artisan make:model AttributeTranslation -m
-   php artisan make:controller \App\Http\Controllers\App\Commerce\AttributeController --model=Attribute --resource --requests
-   php artisan make:resource AttributeResource

-   php artisan make:model AttributeValue -m
-   php artisan make:model AttributeValueTranslation -m
-   php artisan make:controller API\AttributeValueController --api --resource
-   php artisan make:resource AttributeValueResource

-   php artisan make:model ProductVariant -m
-   php artisan make:resource ProductVariantResource

## v1.00.23 Manufacturers

-   php artisan make:model Manufacturer -m
-   php artisan make:model ManufacturerTranslation -m
-   php artisan make:policy ManufacturerPolicy --model=Manufacturer
-   php artisan make:controller \App\Http\Controllers\App\Commerce\ManufacturerController --model=Manufacturer --resource --requests
-   php artisan make:resource ManufacturerResource
-   php artisan make:migration add_manufacturer_column_to_products_table --table=products
-   php artisan migrate
-   php artisan make:seeder ManufacturerSeeder
-   php artisan make:factory ManufacturerFactory
-   php artisan db:seed --class=ManufacturerSeeder

## v1.00.22 Laravel-breadcrumbs [Instruction](https://velog.io/@corean/Laravel-9-inertia-1.0-breadcrumbs)

-   composer require diglactic/laravel-breadcrumbs
-   php artisan vendor:publish --tag=breadcrumbs-config

-   composer require robertboes/inertia-breadcrumbs
-   php artisan vendor:publish --tag="inertia-breadcrumbs-config"

## v1.00.21 Combobox

## v1.00.20 CKEditor

-   npm install --save @ckeditor/ckeditor5-vue @ckeditor/ckeditor5-build-classic
-   php artisan make:controller API/UploadImageController
-   php artisan storage:link
-   npm update
-   php artisan optimize:clear

## v1.00.19

-   npm install -g npm@11.2.0

## v1.00.18 Login/Registration Form

## v1.00.17 Country

-   php artisan make:model Country -m
-   php artisan make:seeder CountrySeeder
-   php artisan make:migration add_column_to_products_table --table=products
-   php artisan db:seed --class=CountrySeeder
-   php artisan make:resource CountryResource

## v1.00.16 Google Auth

-   composer require laravel/socialite
-   php artisan make:controller GoogleAuthController

## v1.00.15 Alert Message

## v1.00.14 Api

-   php artisan install:api
-   php artisan make:controller API/UserController --model=User --resource --api
-   php artisan make:controller API/ProductController --model=Product --resource --api

## v1.00.13 Localization

-   php artisan make:middleware Localization
-   php artisan make:controller LanguageController

## v1.00.12 Policies

-   php artisan make:policy UserPolicy --model=User
-   php artisan make:policy RolePolicy --model=Role
-   php artisan make:policy LanguagePolicy --model=Language
-   php artisan make:policy CategoryPolicy --model=Category
-   php artisan make:policy OrderPolicy --model=Order
-   php artisan make:policy ProductPolicy --model=Product

## v1.00.11 zodexnl/spatie-permission-to-vue-inertia

-   composer require zodexnl/spatie-permission-to-vue-inertia
-   npm run build
-   php artisan optimize:clear

## v1.00.10 Автоматичне створення Laravel Permissions при створенні нових моделей

-   php artisan make:model Order -m
-   php artisan make:controller \App\Http\Controllers\App\Commerce\OrderController --model=Order --resource --requests
-   php artisan make:resource OrderResource

````

```
    $modelName = 'order'; // Тут можна змінити
    $permissions = ['view', 'create', 'update', 'delete'];

    foreach ($permissions as $action) {
        $permissionName = "{$modelName}-{$action}";
        if (!Permission::where('name', $permissionName)->exists()) {
            Permission::create(['name' => $permissionName, 'guard_name' => 'web']);
        }
    }

```

```

## v1.00.9

-   php artisan make:controller \App\Http\Controllers\App\Settings\RolePermissionController --resource

## v1.00.8

-   php artisan make:factory CategoryFactory
-   php artisan make:seeder CategorySeeder
-   php artisan db:seed --class=CategorySeeder

-   php artisan make:factory ProductFactory
-   php artisan make:seeder ProductSeeder
-   php artisan db:seed --class=ProductSeeder

-   php artisan make:seeder ProductsAndCategoriesTableSeeder
-   php artisan db:seed --class=ProductsAndCategoriesTableSeeder

## v1.00.7 e-Commerce

-   php artisan make:model Category -m
-   php artisan make:controller \App\Http\Controllers\App\Commerce\CategoryController --model=Category --resource --requests
-   php artisan make:model Product -m
-   php artisan make:controller \App\Http\Controllers\App\Commerce\ProductController --model=Product --resource --requests
-   php artisan make:resource CategoryResource
-   php artisan make:resource ProductResource

## translatable

-   php artisan make:model CategoryTranslation -m
-   php artisan make:model ProductTranslation -m

## v1.00.6

-   npm install -D tailwindcss postcss autoprefixer
-   Profile Login

## v1.00.5 Laravel-medialibrary

[Laravel-medialibrary](https://spatie.be/docs/laravel-medialibrary/v11/installation-setup)

-   composer require "spatie/laravel-medialibrary"
-   php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
-   php artisan migrate
-   php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-config"

-   php artisan storage:link

## v1.00.4

-   npm i @headlessui/vue
-   npm i vue-the-mask

## v1.00.3

[Add Locales](https://laravel-lang.com/usage-add-locales.html)

-   composer require laravel-lang/common
-   composer require laravel-lang/locales
-   php artisan lang:update
-   php artisan lang:publish

-   npm i laravel-vue-i18n

## v1.00.2 Laravel Localization & translatable

-   php artisan make:model Language -m
-   php artisan make:controller \App\Http\Controllers\App\LanguageController --model=Language --resource --requests
-   php artisan make:resource LanguageResource

-   composer require astrotomic/laravel-translatable
-   php artisan vendor:publish --tag=translatable

-   composer require mcamara/laravel-localization
-   php artisan vendor:publish --provider="Mcamara\LaravelLocalization\LaravelLocalizationServiceProvider"

**[VUE FLAGS](https://www.npmjs.com/package/vue-flag-icon)**

-   npm i --save vue-flag-icon

## v1.00.1

-   php artisan make:migration add_column_to_users_table --table=users
-   php artisan make:seeder UserSeeder
-   php artisan make:seeder CreateSuperUserSeeder
-   php artisan make:seeder CreateRolesAndPermissionsSeeder

-   php artisan make:resource UserResource

-   composer require spatie/laravel-permission
-   php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
-   php artisan optimize:clear
-   php artisan config:clear

-   php artisan make:middleware LastUserActivity

## v1.00.0

-   npm i @tabler/icons-vue

-   php artisan make:controller \App\Http\Controllers\App\UserController --model=User --resource --requests

-   php artisan make:controller \App\Http\Controllers\App\DashboardController
-   php artisan make:controller \App\Http\Controllers\Main\HomeController

## Laravel v11.30.0 (PHP v8.2.12)
```
````
