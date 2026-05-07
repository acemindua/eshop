<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    /**
     * Атрибути, які можна масово призначати.
     */
    protected $fillable = [
        'alias',
        'name',
        'is_active',
        'settings',
        'sort_order',
    ];

    /**
     * Атрибути, які мають бути приведені до певних типів.
     * Laravel 12 підтримує метод casts() замість властивості $casts.
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'settings' => 'array', // Автоматично перетворює JSON у масив і навпаки
            'sort_order' => 'integer',
        ];
    }

    /**
     * Скоуп для отримання лише активних методів доставки (для фронтенду)
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
