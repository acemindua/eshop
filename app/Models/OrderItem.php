<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id', // Зв'язок з актуальним товаром
        'title',      // Історична назва на момент покупки
        'quantity',
        'price',      // Ціна на момент покупки
        'total_price',
        'options',    // Характеристики (колір, розмір тощо)
    ];

    protected $casts = [
        'price'       => 'decimal:2',
        'total_price' => 'decimal:2',
        'options'     => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Зв'язок з товаром (може бути null, якщо товар видалено)
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Item::class, 'product_id');
    }

    protected static function booted(): void
    {
        static::saving(function (OrderItem $item) {
            // Розрахунок загальної суми рядка автоматично
            $item->total_price = $item->price * $item->quantity;
        });
    }
}
