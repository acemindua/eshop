<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdatePaymentMethodRequest extends FormRequest
{
    /**
     * Авторизація (перевірка чи це адмін)
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Правила валідації
     */
    public function rules(): array
    {
        // Отримуємо ID методу оплати з маршруту
        $paymentMethodId = $this->route('payment_method')->id;

        return RuleFactory::make([
            // Трансльовані поля
            '%title%'               => ['required', 'string', 'max:255'],
            '%description%'         => ['nullable', 'string'],
            '%payment_details%'        => ['nullable', 'string'],

            // Системні поля
            // Rule::unique дозволяє ігнорувати поточний запис при оновленні
            'code'                  => [
                'required',
                'string',
                'max:50',
                Rule::unique('payment_methods', 'code')->ignore($paymentMethodId)
            ],
            'driver'                => ['required', 'string', 'max:255'],
            'icon'                  => ['nullable', 'string', 'max:50'],

            // Налаштування API
            'settings'              => ['nullable', 'array'],
            'settings.api_token'    => ['nullable', 'string'],
            'settings.public_key'   => ['nullable', 'string'],
            'settings.private_key'  => ['nullable', 'string'],

            // Параметри
            'commission_fixed'      => ['required', 'numeric', 'min:0'],
            'commission_percent'    => ['required', 'numeric', 'min:0', 'max:100'],
            'is_active'             => ['required', 'boolean'],
            'sort_order'            => ['required', 'integer'],
        ]);
    }

    /**
     * Підготовка даних перед валідацією
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'is_active'          => filter_var($this->is_active, FILTER_VALIDATE_BOOLEAN),
            'sort_order'         => (int) ($this->sort_order ?? 0),
            'commission_fixed'   => (float) ($this->commission_fixed ?? 0),
            'commission_percent' => (float) ($this->commission_percent ?? 0),
            // Обробка settings, якщо вони прийшли як JSON-рядок з фронта
            'settings'           => is_array($this->settings) ? $this->settings : json_decode($this->settings, true),
        ]);
    }
}
