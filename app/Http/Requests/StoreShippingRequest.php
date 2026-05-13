<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreShippingRequest extends FormRequest
{
    /**
     * Дозволяємо запит за наявності прав.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Правила валідації.
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],

            'alias' => [
                'required',
                'string',
                'max:50',
                Rule::unique('shippings')->ignore($this->shipping),
            ],

            'description' => ['nullable', 'string', 'max:500'],

            'price' => ['required', 'numeric', 'min:0'],

            'is_active' => ['boolean'],

            'sort_order' => ['integer', 'min:0'],

            // Валідація JSON налаштувань
            'settings' => ['nullable', 'array'],

            // API ключ потрібен тільки для зовнішніх сервісів
            'settings.api_key' => [
                Rule::requiredIf(fn() => in_array($this->alias, ['nova_poshta', 'ukr_poshta'])),
                'nullable',
                'string',
                'max:255'
            ],

            // Додаткові технічні налаштування (наприклад, іконка або режим розробки)
            'settings.icon' => ['nullable', 'string', 'max:50'],
            'settings.is_test_mode' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Кастомні назви атрибутів.
     */
    public function attributes(): array
    {
        return [
            'title' => 'Назва методу',
            'alias' => 'Аліас (код)',
            'description' => 'Опис доставки',
            'price' => 'Вартість',
            'is_active' => 'Активність',
            'settings.api_key' => 'Ключ API',
            'settings.icon' => 'Іконка',
        ];
    }

    /**
     * Підготовка даних перед валідацією.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
            // Очищуємо аліас від пробілів та зайвих символів
            'alias' => str($this->alias)->slug('_')->toString(),
        ]);
    }
}
