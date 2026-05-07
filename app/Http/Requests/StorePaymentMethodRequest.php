<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StorePaymentMethodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return RuleFactory::make([
            // %title% буде обов'язковим лише для 'uk', для інших — за бажанням
            '%title%' => [
                Rule::requiredIf(fn() => app()->getLocale() === 'uk'),
                'nullable',
                'string',
                'max:255'
            ],
            '%description%'  => ['nullable', 'string'],
            '%payment_details%' => ['nullable', 'string'],

            'code' => [
                'required',
                'string',
                'max:50',
                'alpha_dash',
                Rule::unique('payment_methods', 'code')->ignore($this->route('payment_method'))
            ],
            'driver'            => ['required', 'string', 'max:255'],
            'icon'              => ['nullable', 'string', 'max:50'],
            'settings'          => ['nullable', 'array'],
            'commission_fixed'  => ['required', 'numeric', 'min:0'],
            'commission_percent' => ['required', 'numeric', 'min:0', 'max:100'],
            'is_active'         => ['required', 'boolean'],
            'sort_order'        => ['required', 'integer'],
        ]);
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_active'          => $this->boolean('is_active'), // Більш чистий метод Laravel
            'sort_order'         => (int) ($this->sort_order ?? 0),
            'commission_fixed'   => (float) ($this->commission_fixed ?? 0),
            'commission_percent' => (float) ($this->commission_percent ?? 0),
            'settings'           => $this->parseSettings(),
        ]);
    }

    private function parseSettings(): array
    {
        if (is_array($this->settings)) return $this->settings;
        if (is_string($this->settings)) return json_decode($this->settings, true) ?? [];
        return [];
    }
}
