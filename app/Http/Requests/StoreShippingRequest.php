<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreShippingRequest extends FormRequest
{
    /**
     * Дозволяємо запит, якщо у користувача є права адміна.
     */
    public function authorize(): bool
    {
        // Припускаємо, що у вас є система ролей (spatie/laravel-permission у вашому composer.json)
        return $this->user()->can('manage shippings');
    }

    /**
     * Правила валідації.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'alias' => [
                'required',
                'string',
                Rule::unique('shippings')->ignore($this->shipping),
            ],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],

            // Валідація JSON налаштувань
            'settings' => ['nullable', 'array'],

            // Динамічна валідація залежно від типу доставки
            'settings.api_key' => [
                Rule::requiredIf(fn() => in_array($this->alias, ['nova_poshta', 'delivery', 'ukr_poshta'])),
                'nullable',
                'string'
            ],
            'settings.address' => [
                Rule::requiredIf(fn() => $this->alias === 'pickup'),
                'nullable',
                'string'
            ],
        ];
    }

    /**
     * Кастомні назви атрибутів для помилок.
     */
    public function attributes(): array
    {
        return [
            'name' => 'Назва служби',
            'is_active' => 'Статус активації',
            'settings.api_key' => 'API ключ',
            'settings.address' => 'Адреса складу',
        ];
    }
}
