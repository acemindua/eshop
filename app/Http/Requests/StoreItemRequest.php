<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreItemRequest extends FormRequest
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
        return RuleFactory::make([
            '%title%'           => ['required', 'min:3', 'string', 'max:255', Rule::unique('item_translations', 'title')->using(function ($q) {
                $q->where('locale',  'in_array',  config('translatable.locales'));
            })],
            '%description%'         => ['nullable', 'string'],
            '%content%'             => ['nullable', 'string'],
            '%meta_title%'          => ['nullable', 'string', 'max:255'],
            '%meta_description%'    => ['nullable', 'string', 'max:255'],
            '%meta_keywords%'       => ['nullable', 'string', 'max:255'],
            'category_id' => [
                'nullable',
                'integer',
                Rule::exists('categories', 'id'), // Перевірка, чи є такий ID у таблиці categories
            ],
            'manufacturer_id'       => [
                'nullable',
                'integer',
                Rule::exists('manufacturers', 'id'), // Перевірка, чи є такий ID у таблиці categories
            ],
            'country' => ['nullable', 'string', 'size:2'],
            'quantity'              => ['nullable', 'integer', 'min:-9999'],
            'price'     => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'old_price' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'public'    => ['required', 'boolean'],
            'order'     => ['required', 'integer'],
        ]);
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
