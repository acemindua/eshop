<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $this->merge(['phone' => preg_replace('/[^\d]/', '', $this->phone)]); // Видаляємо всі нечислові символи
        $this->merge(['phone' => preg_replace('/^38/', '', $this->phone)]);   // Видаляємо тільки 38 на початку

        return [
            'phone' => ['nullable', 'string', 'regex:/^0\d{9}$/'], // Очікуємо формат 0671234567 (10 цифр, починається з 0)
            'email' => ['nullable', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $credentials = ['password' => $this->input('password')];

        if ($this->filled('email')) {
            $credentials['email'] = $this->input('email');
        } elseif ($this->filled('phone')) {
            $phone = preg_replace('/[^\d]/', '', $this->input('phone')); // Видаляємо зайві символи
            $phone = preg_replace('/^38/', '', $phone); // Видаляємо тільки 38 на початку
            $credentials['phone'] = $phone;
        } else {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        if (!Auth::attempt($credentials, $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        $identifier = $this->input('email') ?? $this->input('phone') ?? '';
        return Str::transliterate(Str::lower($identifier) . '|' . $this->ip());
    }
}
