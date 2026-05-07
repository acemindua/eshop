<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateShippingRequest extends FormRequest
{
    /**
     * Дозволяємо запит лише авторизованим адміністраторам.
     */
    public function authorize(): bool
    {
        // Використовуємо перевірку прав (наприклад, через Spatie Roles, що є у вашому composer.json)
        return $this->user()->can('manage settings');
    }

    /**
     * Правила валідації.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],

            // Валідація масиву settings
            'settings' => ['nullable', 'array'],

            // Динамічна валідація залежно від типу доставки (alias)
            // Використовуємо $this->shipping (модель, що передається через Route Binding)
            'settings.api_key' => [
                Rule::requiredIf(fn() => in_array($this->shipping->alias, ['nova_poshta', 'delivery', 'ukr_poshta'])),
                'nullable',
                'string',
                'max:500'
            ],

            'settings.address' => [
                Rule::requiredIf(fn() => $this->shipping->alias === 'pickup'),
                'nullable',
                'string',
                'max:1000'
            ],

            // Додатково для добрив: наприклад, мінімальна вага для Delivery
            'settings.min_weight' => [
                Rule::requiredIf(fn() => $this->shipping->alias === 'delivery'),
                'nullable',
                'numeric',
                'min:0'
            ],
        ];
    }

    /**
     * Зручні назви для помилок валідації.
     */
    public function attributes(): array
    {
        return [
            'name' => 'назва',
            'is_active' => 'статус',
            'sort_order' => 'порядок',
            'settings.api_key' => 'API ключ',
            'settings.address' => 'адреса складу',
            'settings.min_weight' => 'мінімальна вага',
        ];
    }
}
