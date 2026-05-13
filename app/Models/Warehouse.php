<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Builder;

class Warehouse extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * Поля для масового заповнення
     */
    protected $fillable = [
        'title',
        'city',
        'address',
        'map_link',
        'working_hours',
        'phone',
        'sort_order', // Додано для можливості сортування
        'is_active'
    ];

    /**
     * Приведення типів
     */
    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Видалив $with = ['translations'], бо ми відмовились від перекладів
     */

    /**
     * Фільтрація через кастомні фільтри
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }

    /**
     * Тільки активні склади з правильним сортуванням
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true)->orderBy('sort_order', 'asc');
    }

    /**
     * Реєстрація медіа-колекцій (фото складу)
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->singleFile() // Зазвичай для одного складу достатньо одного фото
            ->useFallbackUrl('/images/placeholder-warehouse.jpg')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }
}
