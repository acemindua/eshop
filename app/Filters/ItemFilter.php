<?php

namespace App\Filters;

class ItemFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder
            ->whereTranslationLike('title', '%' . $search . '%');
    }

    public function field($value)
    {
        $direction = request('direction', 'asc');
        $direction = in_array(strtolower($direction), ['asc', 'desc']) ? $direction : 'asc';

        if ($value === 'title') {
            return $this->builder
                // Приєднуємо таблицю перекладів
                ->join('item_translations', function ($join) {
                    $join->on('items.id', '=', 'item_translations.item_id')
                        ->where('item_translations.locale', '=', app()->getLocale());
                })
                // Сортуємо за полем із приєднаної таблиці
                ->orderBy('item_translations.title', $direction)
                // Важливо: вибираємо лише поля основної таблиці, щоб не було конфліктів ID
                ->select('items.*');
        }

        return $this->builder->orderBy($value, $direction);
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
