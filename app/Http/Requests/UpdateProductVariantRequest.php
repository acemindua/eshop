<?php

namespace App\Http\Requests;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProductVariantRequest extends FormRequest
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
        return RuleFactory::make(
            [
                'product_id' => ['required', 'integer'],
                'slug'       => ['required', 'min:3', 'string', 'max:255', Rule::unique('product_variants', 'slug')->ignore($this->route('product_variant'))],
                'public'    => ['required', 'boolean'],
            ]
        );
    }
}
