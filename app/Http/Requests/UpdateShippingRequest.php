<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateShippingRequest extends FormRequest
{
    /**
     * Дозволяємо запит лише адміністраторам.
     */
    public function authorize(): bool
    {
        // Перевірка прав (manage shippings або manage settings)
        return true;
    }

    /**
     * Правила валідації.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            // Якщо alias редагується, додаємо унікальність з ігноруванням поточної моделі
            'alias' => [
                'required',
                'string',
                'max:50',
                Rule::unique('shippings')->ignore($this->shipping),
            ],

            'description' => ['nullable', 'string', 'max:500'],

            'price' => ['required', 'numeric', 'min:0'],

            'is_active' => ['required', 'boolean'],

            'sort_order' => ['required', 'integer', 'min:0'],

            // Валідація масиву settings (API ключі, іконки тощо)
            'settings' => ['nullable', 'array'],

            'settings.api_key' => [
                Rule::requiredIf(fn() => in_array($this->shipping->alias, ['nova_poshta', 'ukr_poshta'])),
                'nullable',
                'string',
                'max:500'
            ],

            // Наприклад, для агро-бізнесу: націнка на пакування
            'settings.packaging_fee' => ['nullable', 'numeric', 'min:0'],

            // Іконка для відображення в UI
            'settings.icon' => ['nullable', 'string', 'max:50'],
        ];
    }

    /**
     * Назви атрибутів.
     */
    public function attributes(): array
    {
        return [
            'name' => 'назва',
            'alias' => 'аліас',
            'description' => 'опис',
            'price' => 'ціна',
            'is_active' => 'статус',
            'sort_order' => 'порядок',
            'settings.api_key' => 'API ключ',
        ];
    }

    /**
     * Підготовка даних (для обробки чекбоксів та slug)
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
            'alias' => str($this->alias)->slug('_')->toString(),
        ]);
    }
}
