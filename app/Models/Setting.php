<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'label', 'type', 'value'];

    public $timestamps = true;

    /**
     * Отримати значення з урахуванням типу
     */
    public function getTypedValueAttribute()
    {
        return match ($this->type) {
            'bool'  => filter_var($this->value, FILTER_VALIDATE_BOOLEAN),
            'int'   => (int) $this->value,
            'float' => (float) $this->value,
            'json'  => json_decode($this->value, true),
            default => $this->value,
        };
    }

    /**
     * Глобальний метод для отримання значення налаштування
     */
    public static function getValue($key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->typed_value : $default;
    }

    /**
     * Зберегти значення з урахуванням типу
     */
    public static function setValue($key, $value)
    {
        $setting = static::where('key', $key)->first();

        if ($setting) {
            $setting->value = self::serializeValue($value, $setting->type);
            $setting->save();
            return $setting;
        }

        return static::create([
            'key' => $key,
            'value' => is_array($value) ? json_encode($value) : (string) $value,
            'type' => gettype($value) === 'boolean' ? 'bool' : gettype($value),
        ]);
    }

    /**
     * Преобразование значения для сохранения
     */
    protected static function serializeValue($value, $type)
    {
        return match ($type) {
            'bool'  => $value ? '1' : '0',
            'json'  => json_encode($value),
            default => (string) $value,
        };
    }
}
