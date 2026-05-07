<?php

namespace App\Services;

use App\Models\Option;
use Illuminate\Support\Facades\Cache;

class SettingsManager
{
    // Ключ для кешування
    protected const CACHE_KEY = 'site_settings';

    // Час життя кешу (наприклад, 24 години)
    protected const CACHE_TTL = 60 * 60 * 24;

    /**
     * Завантажує всі налаштування з бази даних і кешує їх.
     * * @return array
     */
    protected function loadSettingsFromDatabase(): array
    {
        // Отримуємо всі налаштування з БД
        $options = Option::all(['key', 'value']);

        // Перетворюємо колекцію на асоціативний масив [key => value]
        $settings = $options->pluck('value', 'key')->toArray();

        // Зберігаємо в кеші
        Cache::put(self::CACHE_KEY, $settings, self::CACHE_TTL);

        return $settings;
    }

    /**
     * Отримує всі налаштування, використовуючи кеш.
     * * @return array
     */
    public function all(): array
    {
        // Спроба отримати дані з кешу. Якщо кешу немає, викликаємо loadSettingsFromDatabase.
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            return $this->loadSettingsFromDatabase();
        });
    }

    /**
     * Отримує значення налаштування за ключем.
     * * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public function get(string $key, mixed $default = null): mixed
    {
        $settings = $this->all();

        // Повертаємо значення з масиву, або значення за замовчуванням
        $value = $settings[$key] ?? $default;

        // Спроба декодувати JSON, якщо це можливо (наприклад, для social_links)
        if (is_string($value) && in_array($key, ['social_links'])) {
            // Можна додати більш складну логіку для перевірки JSON
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $decoded;
            }
        }

        return $value;
    }

    /**
     * Зберігає або оновлює налаштування в БД та скидає кеш.
     * * @param string $key
     * @param mixed $value
     * @return void
     */
    public function set(string $key, mixed $value): void
    {
        // Якщо значення - масив або об'єкт, перетворюємо в JSON
        if (is_array($value) || is_object($value)) {
            $value = json_encode($value, JSON_UNESCAPED_UNICODE);
        }

        // Оновлюємо або створюємо запис у таблиці options
        Option::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );

        // Обов'язково чистимо кеш, щоб при наступному get() дані підтягнулися з БД
        $this->forgetCache();
    }

    /**
     * Очищає кеш налаштувань.
     */
    public function forgetCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
