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
            // Тепер цей статичний виклик працюватиме без помилок
            $this->merge([
                'phone' => User::cleanPhone($this->input('phone'))
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        // Отримуємо ID користувача, який редагується (залежно від того, як влаштований ваш Route)
        // Зазвичай це $this->route('user')->id або $this->id, залишаємо вашу логіку з ignore()
        $userId = $this->route('user')?->id ?? $this->id;

        return [
            'name'         => ['required', 'string', 'max:255'],
            'last_name'    => ['nullable', 'string', 'max:255'],
            'middle_name'  => ['nullable', 'string', 'max:255'], // Додано для повної сумісності з Vue формою

            'email'        => ['required', 'email', 'max:255', Rule::unique(User::class)->ignore($userId)],
            'phone'        => ['nullable', 'string', 'max:20'], // Додано валідацію для телефону

            'birthday'     => ['nullable', 'date_format:Y-m-d'], // Додано для Vue інпуту дати
            'gender'       => ['nullable', Rule::in(['male', 'female', 'other'])], // Додано для селекту статі

            'description'  => ['nullable', 'string'],
            'password'     => ['nullable', 'string', Password::defaults(), 'confirmed'],
            'role' => [
                'required',
                'string',
                // Якщо поточний користувач НЕ super-user, то роль 'super-user' є невалідною для збереження
                Rule::when(!auth()->user()->hasRole('super-user'), function () {
                    return Rule::exists('roles', 'name')->where('name', '!=', 'super-user');
                }, [
                    Rule::exists('roles', 'name') // Якщо ж це super-user, дозволено будь-яку існуючу роль
                ]),
            ],
            'avatar'       => ['nullable', 'image', 'max:2048'],
        ];
    }
}
