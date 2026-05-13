<?php

namespace App\Filters;

class ShippingFilter extends QueryFilter
{
    /**
     * Пошук за назвою, описом або аліасом
     * Наприклад: ?search=nova
     */
    public function search(string $value=''): void
    {
        $this->builder->where(function ($query) use ($value) {
            $query->where('title', 'like', "%{$value}%")
                ->orWhere('alias', 'like', "%{$value}%")
                ->orWhere('description', 'like', "%{$value}%");
        });
    }

    /**
     * Фільтрація за статусом
     * Наприклад: ?is_active=1
     */
    public function is_active(string $value): void
    {
        $this->builder->where('is_active', $value);
    }

    /**
     * Сортування
     * Наприклад: ?sort=price|desc
     */
    public function sort(string $value): void
    {
        $parts = explode('|', $value);
        $field = $parts[0] ?? 'sort_order';
        $direction = $parts[1] ?? 'asc';

        $this->builder->orderBy($field, $direction);
    }
}
