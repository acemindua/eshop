<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class StorePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {

        return RuleFactory::make([
            '%title%' => [
                'required',
                'string',
                'min:3',
                'max:255',
                Rule::unique('page_translations', 'title')->where(function ($query) {
                    $query->whereIn('locale', config('translatable.locales'));
                }),
            ],
            '%description%' => ['nullable', 'string', 'max:255'],
            '%content%' => ['nullable', 'string'], // замість 'text' — string
            '%meta_title%' => ['nullable', 'string', 'max:255'],
            '%meta_description%' => ['nullable', 'string', 'max:255'],
            '%meta_keywords%' => ['nullable', 'string', 'max:255'],
            'public' => ['required', 'boolean'],
            'order' => ['required', 'integer'],
        ]);
    }
}
