<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class UpdatePageRequest extends FormRequest
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
            '%title%'           => ['required', 'min:3', 'string', 'max:255', Rule::unique('page_translations', 'title')->using(function ($q) {
                $q->where('locale',  'in_array',  config('translatable.locales'));
            })],
            '%slug%'           => ['required', 'min:3', 'string', 'max:255', Rule::unique('page_translations', 'slug')->using(function ($q) {
                $q->where('locale',  'in_array',  config('translatable.locales'));
            })],
            '%description%' => ['nullable', 'string'],
            '%content%' => ['nullable', 'string'],
            '%meta_title%' => ['nullable', 'string', 'max:255'],
            '%meta_description%' => ['nullable', 'string', 'max:255'],
            '%meta_keywords%' => ['nullable', 'string', 'max:255'],
            'public' => ['required', 'boolean'],
            'order' => ['required', 'integer'],
        ]);
    }
}
