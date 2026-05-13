<?php

namespace App\Models;

use App\Filters\QueryFilter;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Contracts\Database\Query\Builder;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'alias',
        'title',
        'description',
        'price',
        'is_active',
        'settings',
        'sort_order',
    ];

    /**
     * Laravel 12 Casts
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'settings' => 'array',
            'sort_order' => 'integer',
            'price' => 'decimal:2',
        ];
    }

     /**
     * Filters
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }
    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    /**
     * Замовлення, пов'язані з цим методом доставки
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers (Логіка для фронтенду та контролерів)
    |--------------------------------------------------------------------------
    */

    /**
     * Чи є цей метод самовивозом
     */
    public function isPickup(): bool
    {
        return $this->alias === 'pickup';
    }

    /**
     * Чи потребує цей метод API інструментів (НП/Укрпошта)
     */
    public function isExternal(): bool
    {
        return in_array($this->alias, ['nova_poshta', 'ukr_poshta']);
    }

    /**
     * Отримати іконку з налаштувань або дефолтну
     */
    public function getIconAttribute(): string
    {
        return $this->settings['icon'] ?? 'truck';
    }
}
