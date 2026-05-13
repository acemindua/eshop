<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class WarehousesFilter extends QueryFilter
{
    /**
     * Пошук за назвою або адресою (через таблицю перекладів)
     */
    public function search(string $value): void
    {
        $this->builder->whereHas('translations', function (Builder $query) use ($value) {
            $query->where('title', 'like', "%$value%")
                ->orWhere('address', 'like', "%$value%")
                ->orWhere('city', 'like', "%$value%");
        });
    }

    /**
     * Фільтр за містом (код міста)
     */
    public function city(string $value): void
    {
        $this->builder->where('city_ref', $value);
    }

    /**
     * Фільтр за областю (код області)
     */
    public function area(string $value): void
    {
        $this->builder->where('area_ref', $value);
    }

    /**
     * Фільтр за статусом активності
     */
    public function active(string $value): void
    {
        $this->builder->where('is_active', $value === 'true' || $value === '1');
    }
}
