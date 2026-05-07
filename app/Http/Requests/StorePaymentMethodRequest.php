<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StorePaymentMethodRequest extends FormRequest
{
    /**
     * Перевіряємо, чи авторизований користувач (адмін)
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Правила валідації з використанням RuleFactory
     */
    public function rules(): array
    {
        return RuleFactory::make([
            // Трансльовані поля (автоматично для всіх мов)
            '%title%'               => ['required', 'string', 'max:255'],
            '%description%'         => ['nullable', 'string'],
            '%instructions%'        => ['nullable', 'string'],

            // Системні поля
            'code'                  => ['required', 'string', 'max:50', Rule::unique('payment_methods', 'code')],
            'driver'                => ['required', 'string', 'max:255'], // Напр. App\Services\Payments\Drivers\MonoDriver
            'icon'                  => ['nullable', 'string', 'max:50'],

            // Налаштування API (JSON)
            'settings'              => ['nullable', 'array'],
            'settings.api_token'    => ['nullable', 'string'], // Можна додати специфічні правила для ключів
            'settings.public_key'   => ['nullable', 'string'],
            'settings.private_key'  => ['nullable', 'string'],

            // Комісії та параметри відображення
            'commission_fixed'      => ['required', 'numeric', 'min:0'],
            'commission_percent'    => ['required', 'numeric', 'min:0', 'max:100'],
            'is_active'             => ['required', 'boolean'],
            'sort_order'            => ['required', 'integer'],
        ]);
    }

    /**
     * Підготовка даних (типізація)
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'is_active'          => filter_var($this->is_active, FILTER_VALIDATE_BOOLEAN),
            'sort_order'         => (int) ($this->sort_order ?? 0),
            'commission_fixed'   => (float) ($this->commission_fixed ?? 0),
            'commission_percent' => (float) ($this->commission_percent ?? 0),
            // Якщо settings прийшли як рядок, перетворюємо в масив
            'settings'           => is_array($this->settings) ? $this->settings : json_decode($this->settings, true),
        ]);
    }
}
