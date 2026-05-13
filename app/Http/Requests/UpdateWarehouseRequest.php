<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWarehouseRequest extends FormRequest
{
    /**
     * Використовуємо Policy для перевірки прав
     */
    public function authorize(): bool
    {
        // Якщо використовуєш Policy:
        // return $this->user()->can('update', $this->route('warehouse'));
        return true;
    }

    /**
     * Правила валідації
     */
    public function rules(): array
    {
        return [
            // Обов'язкові поля
            'title'         => ['required', 'string', 'max:255'],
            'city'          => ['required', 'string', 'max:255'],
            'address'       => ['required', 'string', 'max:500'],

            // Додаткові дані
            'phone'         => ['nullable', 'string', 'max:50'],
            'working_hours' => ['nullable', 'string', 'max:255'],
            'map_link'      => ['nullable', 'url', 'max:1000'],

            // Налаштування статусу
            'is_active'     => ['boolean'],
            'sort_order'    => ['integer', 'min:0'],

            // Медіа
            'image'         => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }

    /**
     * Атрибути для зрозумілих помилок
     */
    public function attributes(): array
    {
        return [
            'title'         => 'назва складу',
            'city'          => 'місто',
            'address'       => 'адреса',
            'working_hours' => 'графік роботи',
            'map_link'      => 'посилання на карту',
        ];
    }
}
