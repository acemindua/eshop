# 🚀 Project Setup and Package Installation Guide

This guide details the steps to set up the project and install key Laravel packages for permissions, media management, and localization.

---

## ⚙️ 1. Getting Started (Initial Setup)

These steps cover initial dependency installation and asset compilation, essential for running the application.

1.  **Install PHP Dependencies:**

    ```bash
    composer install
    ```

2.  **Install JavaScript/CSS Dependencies (NPM):**

    ```bash
    npm install
    # Use the --force flag only if you encounter dependency resolution errors:
    # npm install --force
    ```

3.  **Final Asset Compilation (Production Build):**
    This compiles and minifies your assets for production or final testing.

    ```bash
    npm run build
    ```

4.  **Development Mode (Optional):**
    Run this command in a separate terminal if you plan to make **frontend changes**. It automatically recompiles assets on file changes.
    ```bash
    npm run dev
    ```

---

## 🔐 2. Laravel Permission (Spatie)

-   **Version:** v6+ (Based on current documentation link)
-   **Documentation:** [Spatie Laravel Permission Docs](https://spatie.be/docs/laravel-permission/v6/installation-laravel)

1.  **Install the Package:**

    ```bash
    composer require spatie/laravel-permission
    ```

2.  **Publish Migration and Configuration:**
    This command creates the necessary database tables and the `config/permission.php` file.

    ```bash
    php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
    ```

3.  **Clear Configuration Cache:**
    Crucial step to ensure the new config file is loaded correctly.

    ```bash
    php artisan optimize:clear
    ```

4.  **Run Database Migrations:**
    Creates the `roles` and `permissions` tables.

    ```bash
    php artisan migrate
    ```

5.  **Add Trait to User Model:**
    Ensure your `App\Models\User` model uses the `HasRoles` trait.

    ```php
    // In App\Models\User.php
    use Spatie\Permission\Traits\HasRoles;
    // ...
    class User extends Authenticatable
    {
        use HasApiTokens, HasFactory, Notifiable, HasRoles; // <-- Add HasRoles
        // ...
    }
    ```

6.  **Define a Super-Admin Gate (Optional but Recommended):**
    Place this in the `boot()` method of your **`AppServiceProvider.php`** (Laravel 11) or **`AuthServiceProvider.php`** (Laravel 10 and below) to grant a specific role (`super-user`) all permissions implicitly.

    ```php
    use Illuminate\Support\Facades\Gate;
    // ...
    public function boot()
    {
        // Implicitly grant "super-user" role all permissions
        // This makes permission checks (like auth()->user->can() or @can) always return true for this role.
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-user') ? true : null;
        });
    }
    ```

---

## 🖼️ 3. Laravel Media Library (Spatie)

-   **Version:** v11+ (Based on current documentation link)
-   **Documentation:** [Spatie Media Library Docs](https://spatie.be/docs/laravel-medialibrary/v11/introduction)

1.  **Install the Package:**

    ```bash
    composer require "spatie/laravel-medialibrary"
    ```

2.  **Publish Migration:**
    This command generates the migration file to create the `media` table.

    ```bash
    php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
    ```

3.  **Run Database Migrations:**
    Creates the `media` table.

    ```bash
    php artisan migrate
    ```

4.  **Publish Configuration (Optional):**
    If you need to customize settings like disk names or model defaults.

    ```bash
    php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-config"
    ```

5.  **Create Storage Symlink:**
    Essential for making uploaded files in the `storage/app/public` directory accessible via a web URL (`public/storage`).
    ```bash
    php artisan storage:link
    ```

---

## 🌍 4. Localization and Translatable

### 4.1. Astrotomic/laravel-translatable (Model Translations)

-   **Documentation:** [Astrotomic Laravel-Translatable Docs](https://docs.astrotomic.info/laravel-translatable/installation)

1.  **Install the Package:**
    Used for making Eloquent models translatable across different locales.

    ```bash
    composer require astrotomic/laravel-translatable
    ```

2.  **Publish Configuration:**
    Copies the configuration file to `config/translatable.php`.
    ```bash
    php artisan vendor:publish --tag=translatable
    ```

### 4.2. Mcamara/laravel-localization (Route Management)

-   **Documentation:** [Mcamara Laravel-Localization GitHub](https://github.com/mcamara/laravel-localization)

1.  **Install the Package:**
    Handles localization of routes and URL segments.

    ```bash
    composer require mcamara/laravel-localization
    ```

2.  **Publish Configuration:**
    Copies the configuration file to `config/laravellocalization.php`.

    ```bash
    php artisan vendor:publish --provider="Mcamara\LaravelLocalization\LaravelLocalizationServiceProvider"
    ```

3.  **Register Middleware (Laravel 11+):**
    If using Laravel 11, ensure the middleware aliases are registered in `bootstrap/app.php` within the `withMiddleware` closure. (For Laravel 10 and below, they would typically be registered in `app/Http/Kernel.php`.)

    ```php
    // In bootstrap/app.php
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

### 4.3. Laravel-Lang/Common (Language Files)

-   **Documentation:** [Laravel-Lang Usage Docs](https://laravel-lang.com/usage-add-locales.html)

1.  **Install the Package:**
    Provides standard Laravel language files for multiple locales (e.g., validation messages, pagination, etc.).

    ```bash
    composer require laravel-lang/common
    ```

2.  **Update/Add Language Files:**
    This command will download and update the language files based on your configuration (typically defined in `config/app.php` and `config/laravellocalization.php`).
    ```bash
    php artisan lang:update
    ```

### 5. Create Super User & add roles

1. **RolesAndPermissionsSeeder**

    ```bash
    php artisan make:seeder RolesAndPermissionsSeeder
    ```

    ```bash
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        //Super User
        $role = Role::create(['name' => 'super-user']);
        $user = User::create([
            'name'      => 'Super User',
            'email'     => 'acemind.ua@gmail.com',
            'password'  => Hash::make('admin@admin'),
            'email_verified_at' => now(),
        ]);

        $user->assignRole('super-user');

        // Administrator
        $role = Role::create(['name' => 'administrator']);

        // create permissions for Model User
        Permission::create(['name' => 'user-view']);
        Permission::create(['name' => 'user-create']);
        Permission::create(['name' => 'user-update']);
        Permission::create(['name' => 'user-delete']);
        // create permissions for Model Roles
        Permission::create(['name' => 'role-view']);
        Permission::create(['name' => 'role-create']);
        Permission::create(['name' => 'role-update']);
        Permission::create(['name' => 'role-delete']);

        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'moder'])
            ->givePermissionTo(
                [
                    'user-view',
                    'user-update'
                ]
            );
        $role = Role::create(['name' => 'user']);
    }
    ```

    Refresh DB start with Seeder

    ```bash
    php artisan migrate:fresh --seed
    ```
