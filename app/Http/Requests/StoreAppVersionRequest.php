<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppVersionRequest extends FormRequest
{
    /**
     * Дозволяємо запит (зазвичай в адмінці тут true, 
     * оскільки перевірка прав йде на рівні middleware)
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Правила валідації
     */
    public function rules(): array
    {
        return [
            'version' => [
                'required',
                'string',
                'max:20',
                // Перевірка на унікальність, щоб не створити дві однакові версії
                Rule::unique('app_versions', 'version'),
            ],
            'release_date' => ['nullable', 'date'],
            'status' => ['nullable', 'string', Rule::in(['active', 'completed', 'planned'])],
        ];
    }

    /**
     * Кастомні повідомлення про помилки (опціонально)
     */
    public function messages(): array
    {
        return [
            'version.required' => 'Номер версії обов’язковий.',
            'version.unique' => 'Така версія вже існує в базі.',
            'version.max' => 'Номер версії занадто довгий.',
        ];
    }
}
