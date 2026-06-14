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

    public function min_price($value = 0)
    {
        return $this->builder->where('price', '>=', $value);
    }

    public function max_price($value = 0)
    {
        return $this->builder->where('price', '<=', $value);
    }

    public function manufacturers($values)
    {
        return $this->builder->whereIn('manufacturer_id', (array) $values);
    }

    public function rating($value)
    {
        return $this->builder->where('rating', '>=', $value);
    }

    public function category_id($value)
    {
        // Знаходимо категорію, щоб отримати дерево
        $category = \App\Models\Category::find($value);

        if ($category) {
            // Отримуємо масив ID: [1, 2, 5, 8...]
            $allIds = $category->getAllChildrenIds();

            // Використовуємо whereIn для вибірки товарів з усіх категорій
            return $this->builder->whereIn('category_id', $allIds);
        }

        return $this->builder->where('category_id', $value);
    }

    public function promo($value = null)
    {
        // Якщо значення не передано або воно false/0, просто повертаємо builder
        if (!$value || filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) === false) {
            return $this->builder;
        }

        return $this->builder
            ->whereNotNull('old_price')
            ->whereRaw('old_price > price');
    }
}
