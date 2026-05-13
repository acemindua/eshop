<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'number',
        'status', // new, processing, shipped, completed, cancelled
        'total_price',
        'shipping_price',
        'currency',
        'delivery_info', // JSON: method, city, warehouse, refs
        'customer_info', // JSON: name, phone, email
        'notes',
    ];

    protected $casts = [
        'total_price'    => 'decimal:2',
        'shipping_price' => 'decimal:2',
        'delivery_info'  => 'array',
        'customer_info'  => 'array',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
    ];

    /**
     * Автоматизація при створенні
     */
    protected static function booted(): void
    {
        static::creating(function (Order $order) {
            // Генеруємо номер замовлення автоматично, якщо він порожній
            if (empty($order->number)) {
                $order->number = static::generateOrderNumber();
            }

            // Встановлюємо валюту за замовчуванням
            if (empty($order->currency)) {
                $order->currency = 'UAH';
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeFilter(Builder $builder, QueryFilter $filter): Builder
    {
        return $filter->apply($builder);
    }

    public static function generateOrderNumber(): string
    {
        // Формат: ORD-20260508-XXXX
        return 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));
    }
}
