<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreManufacturerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'   => ['required', 'string', 'max:255', Rule::unique('manufacturers', 'title')],
            'slug' => [
                'required',
                'min:3',
                'string',
                'max:255',
                Rule::unique('manufacturers', 'slug'),
            ],
            'country' => ['nullable', 'string', 'size:2'],
            'public'  => ['boolean'],
            'order'   => ['integer', 'min:0'],
        ];
    }

    /**
     * Підготовка даних перед валідацією
     */
    protected function prepareForValidation()
    {
        $this->merge([
            // Перетворюємо 'true'/'false' з фронтенда у булеве значення
            'public' => filter_var($this->public, FILTER_VALIDATE_BOOLEAN),
            'order'  => (int) ($this->order ?? 0),
        ]);
    }
}
