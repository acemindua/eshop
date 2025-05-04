<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class StoreCategoryRequest extends FormRequest
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
            '%title%'           => ['required', 'min:3', 'string', 'max:255', Rule::unique('category_translations', 'title')->using(function ($q) {
                $q->where('locale',  'in_array', array_keys(LaravelLocalization::getSupportedLocales()));
            })],
            '%description%' => ['nullable', 'string'],
            '%content%' => ['nullable', 'string'],
            'public' => ['required', 'boolean'],
            'order' => ['required', 'integer'],
            'category_id' => ['nullable', 'integer', Rule::exists('categories', 'id')],
            'user_id' => ['required', 'integer', Rule::exists('users', 'id')],
        ]);
    }
}
