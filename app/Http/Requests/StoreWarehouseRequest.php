<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWarehouseRequest extends FormRequest
{
    /**
     * Дозволяємо запит
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Правила валідації
     */
    public function rules(): array
    {
        return [
            // Основні обов'язкові поля
            'title'         => ['required', 'string', 'max:255'],
            'city'          => ['required', 'string', 'max:255'],
            'address'       => ['required', 'string', 'max:500'],

            // Додаткові поля
            'phone'         => ['nullable', 'string', 'max:50'],
            'working_hours' => ['nullable', 'string', 'max:255'],
            'map_link'      => ['nullable', 'url', 'max:1000'], // Валідуємо як URL для безпеки

            // Технічні поля
            'is_active'     => ['boolean'],
            'sort_order'    => ['integer', 'min:0'],

            // Валідація зображення (якщо завантажуєш через форму)
            'image'         => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }

    /**
     * Кастомні назви атрибутів для помилок
     */
    public function attributes(): array
    {
        return [
            'title'         => 'назва складу',
            'city'          => 'місто',
            'address'       => 'адреса',
            'map_link'      => 'посилання на карту',
            'working_hours' => 'графік роботи',
        ];
    }
}
