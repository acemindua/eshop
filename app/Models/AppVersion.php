<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AppVersion extends Model
{
    // Додаємо status у fillable
    protected $fillable = ['version', 'released_at', 'is_active', 'status'];

    protected $casts = [
        'released_at' => 'date',
        'is_active' => 'boolean'
    ];

    /**
     * Filters
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }

    /**
     * Важливо: Видаляємо блок booted() з цієї моделі!
     * Логіка оновлення статусу версії має бути або в AppVersionItem, 
     * або (як зараз у вашому проекті) у контролері через метод syncStatus.
     * 
     * Якщо залишити refreshVersionStatus тут, вона буде шукати $this->appVersion,
     * якого не існує в цій моделі, і викликати помилки.
     */

    /**
     * Зв'язок із пунктами чекліста.
     * Використовуємо 'app_version_id', як вказали в новій міграції.
     */
    public function items(): HasMany
    {
        return $this->hasMany(AppVersionItem::class, 'app_version_id')->orderBy('sort_order');
    }
}
