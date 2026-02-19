<?php

namespace App\Filters;

class ItemFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder
            ->whereTranslationLike('title', '%' . $search . '%');
    }

    public function min_price($value)
    {
        return $this->builder->where('price', '>=', $value);
    }

    public function max_price($value)
    {
        return $this->builder->where('price', '<=', $value);
    }

    public function manufacturers($value)
    {
        // Очікуємо масив ID: ?manufacturers[]=1&manufacturers[]=2
        $ids = is_array($value) ? $value : explode(',', $value);
        return $this->builder->whereIn('manufacturer_id', $ids);
    }
}
