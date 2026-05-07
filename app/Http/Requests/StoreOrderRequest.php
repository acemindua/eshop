<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Дозволяємо запит усім (або додайте перевірку на наявність товарів у кошику).
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
            // Контактні дані
            'last_name'       => ['required', 'string', 'max:100'],
            'first_name'      => ['required', 'string', 'max:100'],
            'middle_name'     => ['nullable', 'string', 'max:100'],
            'phone'           => ['required', 'string', 'regex:/^\+?380\d{9}$/'], // Валідація українського номера
            'email'           => ['required', 'email', 'max:255'],

            // Доставка
            'delivery_method' => ['required', 'string', 'exists:shippings,alias'],

            // Поле warehouse обов'язкове для всіх, крім самовивозу (pickup)
            'warehouse'       => [
                'required_unless:delivery_method,pickup',
                'nullable',
                'string',
                'max:500'
            ],

            // Оплата та бонуси
            'payment_method'  => ['required', 'string', 'in:card,cash,invoice'],
            'use_bonuses'     => ['boolean'],

            // Коментар (якщо додасте поле в майбутньому)
            'comment'         => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Кастомні повідомлення про помилки (локалізація).
     */
    public function messages(): array
    {
        return [
            'phone.regex' => 'Формат номера має бути +380XXXXXXXXX',
            'warehouse.required_unless' => 'Будь ласка, вкажіть адресу або номер відділення для доставки.',
        ];
    }

    /**
     * Підготовка даних перед валідацією.
     */
    protected function prepareForValidation()
    {
        // Очищення номера телефону від зайвих символів, крім +
        if ($this->phone) {
            $this->merge([
                'phone' => preg_replace('/[^\+\d]/', '', $this->phone),
            ]);
        }
    }
}
