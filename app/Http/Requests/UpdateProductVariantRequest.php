<?php

namespace App\Http\Requests;

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
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'sku'   => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'sku')->ignore($this->id)
            ],
            'price'      => 'required|numeric|min:0|max:999999.99',
            'quantity'   => 'required|integer|min:0',
            'order'      => 'nullable|integer|min:1',
            'public'     => 'required|boolean',
        ];
    }

    /**
     * Custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'product_id.required' => 'Product ID is required.',
            'product_id.exists'   => 'Selected product does not exist.',
            'sku.required'        => 'SKU is required.',
            'sku.unique'          => 'SKU must be unique.',
            'price.required'      => 'Price is required.',
            'price.numeric'       => 'Price must be a number.',
            'quantity.required'   => 'Quantity is required.',
            'quantity.integer'    => 'Quantity must be an integer.',
            'public.boolean'      => 'Public must be true or false.',
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'public' => filter_var($this->public, FILTER_VALIDATE_BOOLEAN),
        ]);
    }
}
