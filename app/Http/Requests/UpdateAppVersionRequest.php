<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAppVersionRequest extends FormRequest
{
    /**
     * Дозволяємо виконання запиту
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
        // Отримуємо ID поточної версії з маршруту (appVersion — назва параметра в Route)
        $versionId = $this->route('appVersion');

        return [
            'version' => [
                'required',
                'string',
                'max:20',
                // Унікальність, ігноруючи поточний запис
                Rule::unique('app_versions', 'version')->ignore($versionId),
            ],
            'release_date' => ['nullable', 'date'],
            'status' => [
                'nullable',
                'string',
                Rule::in(['draft', 'active', 'completed', 'planned'])
            ],
        ];
    }

    /**
     * Повідомлення про помилки
     */
    public function messages(): array
    {
        return [
            'version.required' => 'Номер версії не може бути порожнім.',
            'version.unique' => 'Цей номер версії вже закріплений за іншим записом.',
        ];
    }
}
