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
    use SoftDeletes; // Allows keeping records for accounting after "deletion"

    /**
     * The attributes that are mass assignable.
     * Including fields referenced in the migration.
     */
    protected $fillable = [
        'user_id',
        'number',
        'title',
        'status',
        'total_price',
        'shipping_price',
        'currency',
        'customer_name',
        'customer_email',
        'shipping_address',
        'notes',
    ];

    /**
     * The attributes that should be cast to native types.
     * Ensures prices are treated as decimals/strings and dates are objects.
     */
    protected $casts = [
        'total_price' => 'decimal:2',
        'shipping_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relationship: An order belongs to a User (Customer).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: An order consists of many line items.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Scope: Apply custom filters from the OrderFilter class.
     * * @param Builder $builder
     * @param QueryFilter $filter
     * @return Builder
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter): Builder
    {
        return $filter->apply($builder);
    }

    /**
     * Helper: Generate a unique order number.
     * Can be called before creating a record.
     */
    public static function generateOrderNumber(): string
    {
        return 'ORD-' . strtoupper(now()->format('Ymd')) . '-' . strtoupper(bin2hex(random_bytes(3)));
    }
}
