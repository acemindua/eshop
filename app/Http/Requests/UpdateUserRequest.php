<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Validator;

class UpdateUserRequest extends FormRequest
{
    protected $id;

    public function __construct(Request $request)
    {
        // Це не обов'язково, якщо ви хочете отримати ID безпосередньо в методах
        $this->id = $request->route('user');
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::check();; // Тут можна додати логіку авторизації, якщо потрібно
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Очищення номера телефону від пробілів, якщо він є в запиті
        if ($this->input('phone')) {
            $this->merge(['phone' => trim(str_replace(' ', '', $this->input('phone')))]);
        }

        return [
            'name'          => ['string', 'max:255'],
            'surname'       => ['string', 'max:255'],
            'email'         => ['email', 'max:255', Rule::unique(User::class)->ignore($this->id)],
            'phone'         => ['string', 'max:20', Rule::unique(User::class)->ignore($this->id)],
            'description'   => ['nullable', 'string'],
            'password'      => ['nullable', Password::defaults(), 'confirmed'], // Пароль може бути не обов'язковим, якщо його не змінюють
            'role'          => ['nullable', 'string', 'min:3'], // Перевірка для поля role
        ];
    }
}
