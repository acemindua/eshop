<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Darryldecode\Cart\Facades\CartFacade as Cart;

class StoreOrderRequest extends FormRequest
{
    /**
     * Дозволяємо запит лише якщо кошик не порожній.
     */
    public function authorize(): bool
    {
        return !Cart::isEmpty();
    }

    /**
     * Правила валідації.
     */
    public function rules(): array
    {
        return [
            // Контактні дані
            'last_name'       => ['required', 'string', 'min:2', 'max:100'],
            'first_name'      => ['required', 'string', 'min:2', 'max:100'],
            'middle_name'     => ['nullable', 'string', 'max:100'],
            'phone'           => ['required', 'string', 'regex:/^\+?380\d{9}$/'],
            'email'           => ['required', 'email:rfc,dns', 'max:255'],

            // Доставка
            'delivery_method' => ['required', 'string'],

            // Основна адреса/склад
            'warehouse'       => [
                'required_unless:delivery_method,pickup',
                'nullable',
                'string',
                'max:500'
            ],

            // Технічні поля для Nova Poshta (якщо використовуються)
            'city_ref'        => ['nullable', 'string', 'size:36'], // UUID формат НП
            'warehouse_ref'   => ['nullable', 'string', 'size:36'],

            // Оплата
            'payment_method'  => ['required', 'string', 'in:card,cash,invoice'],

            // Коментар та бонуси
            'comment'         => ['nullable', 'string', 'max:1000'],
            'use_bonuses'     => ['nullable', 'boolean'],
        ];
    }

    /**
     * Локалізація помилок.
     */
    public function messages(): array
    {
        return [
            'phone.regex' => 'Формат номера має бути +380XXXXXXXXX',
            'warehouse.required_unless' => 'Вкажіть адресу доставки або відділення.',
            'email.email' => 'Введіть коректну електронну адресу.',
            'city_ref.size' => 'Помилка вибору міста. Спробуйте ще раз.',
        ];
    }

    /**
     * Підготовка даних перед валідацією.
     */
    protected function prepareForValidation()
    {
        if ($this->phone) {
            // Видаляємо все, крім цифр
            $cleanPhone = preg_replace('/\D/', '', $this->phone);

            // Якщо номер починається з 0, додаємо +38
            if (str_starts_with($cleanPhone, '0')) {
                $cleanPhone = '38' . $cleanPhone;
            }

            // Додаємо + на початок
            $cleanPhone = '+' . $cleanPhone;

            $this->merge([
                'phone' => $cleanPhone,
                // Приводимо email до нижнього регістру
                'email' => strtolower($this->email),
                // Чистимо коментар від зайвих пробілів/тегів
                'comment' => strip_tags(trim($this->comment)),
            ]);
        }
    }
}
