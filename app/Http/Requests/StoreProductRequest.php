<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class StoreProductRequest extends FormRequest
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
            '%title%'           => ['required', 'min:3', 'string', 'max:255', Rule::unique('product_translations', 'title')->using(function ($q) {
                $q->where('locale',  'in_array', array_keys(LaravelLocalization::getSupportedLocales()));
            })],
            '%description%' => ['nullable', 'string', 'max:255'],
            '%content%' => ['nullable', 'string'],
            '%meta_title%' => ['nullable', 'string', 'max:255'],
            '%meta_description%' => ['nullable', 'string', 'max:255'],
            '%meta_keywords%' => ['nullable', 'string', 'max:255'],
            'sku'   => 'nullable|string|max:255|unique:products,sku',
            'price'      => 'required|numeric|min:0|max:999999.99', // max matches decimal(8,2)
            'quantity'   => 'required|integer|min:0',
            'slug'          => [
                'nullable', // <--- CHANGE THIS FROM 'required' TO 'nullable'
                'min:3',
                'string',
                'max:255',
                // For 'unique', consider if you're creating or updating:
                // If creating (your current context):
                'unique:products,slug',
                // If updating an existing product (e.g., PUT/PATCH request), you'd need to ignore the current product's slug:
                // Rule::unique('products', 'slug')->ignore($this->route('product')), // Assuming route model binding
            ],
            'public' => ['required', 'boolean'],
            'order' => ['required', 'integer'],
            'manufacturer_id' => ['nullable', 'integer', Rule::exists('manufacturers', 'id')],
            'category_id' => ['required', 'integer', Rule::exists('categories', 'id')],
            'country_id' => ['nullable', 'integer', Rule::exists('countries', 'id')],
            'user_id' => ['required', 'integer', Rule::exists('users', 'id')],
        ]);
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Please select a category.',
        ];
    }
}
