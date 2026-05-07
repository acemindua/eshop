<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model implements TranslatableContract
{
    use HasFactory, Translatable;

    public $translatedAttributes = [
        'title',
        'description',
        'instructions',
    ];

    protected $fillable = [
        'code',
        'driver',             // Додаємо: шлях до класу драйвера
        'settings',           // Додаємо: JSON з налаштуваннями (ключі API)
        'icon',
        'commission_fixed',
        'commission_percent',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'commission_fixed' => 'float',
        'commission_percent' => 'float',
        'sort_order' => 'integer',
        'settings' => 'array', // КРИТИЧНО: автоматично перетворює JSON з бази в масив PHP
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
