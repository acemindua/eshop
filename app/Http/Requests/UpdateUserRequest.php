<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Очистка номера телефону перед валідацією
     */
    protected function prepareForValidation()
    {
        if ($this->filled('phone')) {
            $this->merge(['phone' => User::cleanPhone($this->input('phone'))]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'          => ['string', 'max:255'],
            'last_name'     => ['nullable', 'string', 'max:255'],
            'email'         => ['email', 'max:255', Rule::unique(User::class)->ignore($this->id)],
            'description'   => ['nullable', 'string'],
            'password'      => ['nullable', 'string', Password::defaults(), 'confirmed'],
            'role'          => ['nullable', 'string', 'min:3'],
            'avatar'        => ['nullable', 'image', 'max:2048'], // image = дозволяє jpg, png, bmp, gif, svg; max:2048 = 2MB
        ];
    }
}
