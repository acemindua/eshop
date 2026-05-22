<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

/**
 * Class WarehousesFilter
 * 
 * Handles HTTP query string filtering and sorting for the Warehouse model.
 * 
 * @package App\Filters
 */
class WarehousesFilter extends QueryFilter
{
    /**
     * @var string The default column used for database sorting.
     */
    protected string $sortField = 'sort_order';

    /**
     * Filter by general search query across title, address, and city columns.
     *
     * @param string|null $value
     * @return void
     */
    public function search(?string $value = null): void
    {
        if (blank($value)) {
            return;
        }

        $this->builder->where(function (Builder $query) use ($value) {
            $query->where('title', 'like', "%{$value}%")
                ->orWhere('address', 'like', "%{$value}%")
                ->orWhere('city', 'like', "%{$value}%");
        });
    }

    /**
     * Filter by city reference code.
     *
     * @param string|null $value
     * @return void
     */
    public function city(?string $value = null): void
    {
        if (blank($value)) {
            return;
        }

        $this->builder->where('city_ref', $value);
    }

    /**
     * Filter by area reference code.
     *
     * @param string|null $value
     * @return void
     */
    public function area(?string $value = null): void
    {
        if (blank($value)) {
            return;
        }

        $this->builder->where('area_ref', $value);
    }

    /**
     * Filter by active status.
     *
     * @param string|null $value
     * @return void
     */
    public function active(?string $value = null): void
    {
        if (blank($value)) {
            return;
        }

        $isActive = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

        if ($isActive !== null) {
            $this->builder->where('is_active', $isActive);
        }
    }

    /**
     * Capture and validate the column target for sorting.
     * Prevents SQL injection by matching against a strict whitelist.
     *
     * @param string|null $value
     * @return void
     */
    public function field(?string $value = null): void
    {
        if (blank($value)) {
            return;
        }

        $allowedFields = ['id', 'sort_order', 'is_active', 'title', 'city', 'address'];

        if (in_array($value, $allowedFields, true)) {
            $this->sortField = $value;
        }
    }

    /**
     * Apply the sorting direction to the final query builder.
     *
     * @param string|null $value
     * @return void
     */
    public function direction(?string $value = null): void
    {
        $direction = strtolower($value ?? 'asc') === 'desc' ? 'desc' : 'asc';

        $this->builder->orderBy("warehouses.{$this->sortField}", $direction);
    }
}
