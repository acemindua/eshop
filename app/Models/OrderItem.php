<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * We include historical data like title and price.
     */
    protected $fillable = [
        'order_id',
        'item_id',
        'title',
        'quantity',
        'price',
        'total_price',
        'tax_amount',
        'options',
    ];

    /**
     * The attributes that should be cast.
     * JSON options are automatically converted to an array.
     */
    protected $casts = [
        'price'       => 'decimal:2',
        'total_price' => 'decimal:2',
        'tax_amount'  => 'decimal:2',
        'options'     => 'array', // Useful for storing size, color, etc.
    ];

    /**
     * Relationship: Link back to the main order.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Relationship: Link to the current product.
     * Note: This might be null if the product was deleted from the catalog.
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * Model Boot Logic:
     * Automatically calculate the total_price before saving.
     */
    protected static function booted(): void
    {
        static::creating(function (OrderItem $orderItem) {
            $orderItem->total_price = $orderItem->price * $orderItem->quantity;
        });

        static::updating(function (OrderItem $orderItem) {
            $orderItem->total_price = $orderItem->price * $orderItem->quantity;
        });
    }
}
