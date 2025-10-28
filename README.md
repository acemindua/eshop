## Laravel Permission (v0.4)

[**Doc**](https://spatie.be/docs/laravel-permission/v6/installation-laravel)

1. **Base installation**

    ```bash
    composer require spatie/laravel-permission
    ```

    You should publish the migration and the config/permission.php config file with:

    ```bash
    php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
    ```

    Clear your config cache.

    ```bash
    php artisan optimize:clear
    ```

    Run the migrations:

    ```bash
    php artisan migrate
    ```

    Add the necessary trait to your User model:

    ```bash
    // The User model requires this trait
    use HasRoles;
    ```

    Defining a Super-Admin
    In Laravel 11 this would go in the boot() method of AppServiceProvider: In Laravel 10 and below it would go in the boot() method of AuthServiceProvider.php:

    ```bash
    use Illuminate\Support\Facades\Gate;
    // ...
    public function boot()
    {
        // Implicitly grant "Super Admin" role all permissions
        // This works in the app by using gate-related functions like auth()->user->can() and @can()
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-user') ? true : null;
        });
    }
    ```

## 🖼️ Laravel Media Library (v0.3)

[**Spatie Media Library**](https://spatie.be/docs/laravel-medialibrary/v11/introduction)

1. **Base installation**

    ```bash
    composer require "spatie/laravel-medialibrary"
    ```

    You need to publish the migration to create the media table:

    ```bash
    php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
    ```

    After that, you need to run migrations.

    ```bash
    php artisan migrate
    ```

    Publishing the config file is optional:

    ```bash
    php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-config"
    ```

    Create storage:link

    ```bash
    php artisan storage:link
    ```

## 🌍 Localization & translatable (v0.2)

1.  [**Astrotomic:**](https://docs.astrotomic.info/laravel-translatable/installation)

    Add the package in your composer.json by executing the command.

    ```bash
    composer require astrotomic/laravel-translatable
    ```

    We copy the configuration file to our project.

    ```bash
    php artisan vendor:publish --tag=translatable
    ```

2.  [**Laravel Localization**](https://github.com/mcamara/laravel-localization)

    Install the package via composer:

    ```bash
    composer require mcamara/laravel-localization
    ```

    In order to edit the default configuration you may execute:

    ```bash
    php artisan vendor:publish --provider="Mcamara\LaravelLocalization\LaravelLocalizationServiceProvider"
    ```

    If you are using Laravel 11, you may register in bootstrap/app.php file in closure withMiddleware:

    ```bash
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'localize'                => \Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRoutes::class,
            'localizationRedirect'    => \Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRedirectFilter::class,
            'localeSessionRedirect'   => \Mcamara\LaravelLocalization\Middleware\LocaleSessionRedirect::class,
            'localeCookieRedirect'    => \Mcamara\LaravelLocalization\Middleware\LocaleCookieRedirect::class,
            'localeViewPath'          => \Mcamara\LaravelLocalization\Middleware\LaravelLocalizationViewPath::class,
        ]);
    })
    ```

3.  [**Managing Locales**](https://laravel-lang.com/usage-add-locales.html)

    Install the package using the console command:

    ```bash
    composer require laravel-lang/common
    ```

    ```bash
    php artisan lang:update
    ```

## ⚙️ Встановлення та Перший Запуск (v0.1)

1.  **Залежності PHP:**

    ```bash
    composer install
    ```

2.  **Залежності JS/CSS:**

    ```bash
    npm install
    # Використовуйте прапор лише, якщо виникають помилки: npm install --force
    ```

3.  **Фінальна Збірка Активів:**

    ```bash
    npm run build
    ```

4.  **Запуск Додатку:**
    -   **Режим розробки (Watch mode):** В окремому терміналі запустіть компіляцію активів, якщо ви плануєте змінювати фронтенд.
        ```bash
        npm run dev
        ```
