<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWarehouseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'         => ['required', 'string', 'max:255'],
            'city'          => ['required', 'string', 'max:255'],
            'address'       => ['required', 'string', 'max:500'],
            'phone'         => ['nullable', 'string', 'max:50'],
            'working_hours' => ['nullable', 'string', 'max:255'],
            'map_link'      => ['nullable', 'url', 'max:1000'],
            'is_active'     => ['boolean'],
            'sort_order'    => ['integer', 'min:0'],
            'image'         => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title'         => 'warehouse title',
            'city'          => 'city',
            'address'       => 'street address',
            'map_link'      => 'map link',
            'working_hours' => 'working hours',
        ];
    }
}
