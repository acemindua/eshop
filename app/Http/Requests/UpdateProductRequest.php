<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class UpdateProductRequest extends FormRequest
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
            '%description%' => ['nullable', 'string'],
            '%content%' => ['nullable', 'string'],
            '%meta_title%' => ['nullable', 'string', 'max:255'],
            '%meta_description%' => ['nullable', 'string', 'max:255'],
            '%meta_keywords%' => ['nullable', 'string', 'max:255'],
            'sku'   => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'sku')->ignore($this->id)
            ],
            'price'      => 'required|numeric|min:0|max:999999.99', // max matches decimal(8,2)
            'quantity'   => 'required|integer|min:0',
            'slug' => [
                'required',
                'min:3',
                'string',
                'max:255',
                Rule::unique('products', 'slug')->ignore($this->id),
            ],

            'public' => ['required', 'boolean'],
            'order' => ['required', 'integer'],
            'manufacturer_id' => ['nullable', 'integer', Rule::exists('manufacturers', 'id')],
            'category_id' => ['nullable', 'integer', Rule::exists('categories', 'id')],
            'country_id' => ['nullable', 'integer', Rule::exists('countries', 'id')],
            'user_id' => ['required', 'integer', Rule::exists('users', 'id')],
        ]);
    }
}
