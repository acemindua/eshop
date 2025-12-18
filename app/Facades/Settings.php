<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static mixed get(string $key, mixed $default = null)
 * @method static array all()
 * @method static void forgetCache()
 * * @see \App\Services\SettingsManager
 */
class Settings extends Facade
{
    /**
     * Повертає назву прив'язки в Service Container.
     * * @return string
     */
    protected static function getFacadeAccessor(): string
    {
        // Це унікальний рядок, під яким наш клас буде зареєстрований
        return 'settings.manager';
    }
}
