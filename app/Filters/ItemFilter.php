<?php

namespace App\Filters;

use App\Models\Item;
use Illuminate\Support\Facades\Log;

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

    public function rating($value = 0)
    {
        if (!$value || !is_numeric($value)) {
            return $this->builder;
        }

        return $this->builder->whereExists(function ($query) use ($value) {
            $query->selectRaw(1)
                ->from('ratings')
                ->join('reviews', 'reviews.id', '=', 'ratings.review_id')
                ->whereColumn('reviews.reviewable_id', 'items.id')
                ->where('reviews.reviewable_type', \App\Models\Item::class)
                ->groupBy('reviews.reviewable_id')
                ->havingRaw('AVG(ratings.value) >= ?', [(float) $value]);
        });
    }

    public  function categories($values = [])
    {
        $ids = is_array($values) ? $values : explode(',', $values);
        return $this->builder->whereIn('category_id', $ids);
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

    public function sale($value = false)
    {
        // Якщо значення не передано або воно false/0, просто повертаємо builder
        if (!$value || filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) === false) {
            return $this->builder;
        }

        return $this->builder
            ->whereNotNull('old_price')
            ->whereRaw('old_price > price');
    }

    public function in_stock($value = false)
    {
        if (!$value || filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) === false) {
            return $this->builder;
        }

        return $this->builder
            ->whereRaw('quantity > 0');
    }

    public function brands($values = [])
    {
        $brandIds = is_array($values) ? $values : explode(',', $values);
        return $this->builder->whereIn('brand_id', $brandIds);
    }

    public function sort($value = null)
    {
        return match ($value) {
            'price_asc' => $this->builder->orderBy('price', 'asc'),
            'price_desc' => $this->builder->orderBy('price', 'desc'),
            'created_at_desc' => $this->builder->latest(),

            // Використовуємо withAvg для підрахунку рейтингу без явних JOIN
            'rating_desc' => $this->builder
                ->withAvg('ratings as avg_rating', 'value') // Примусово називаємо поле 'avg_rating'
                ->orderBy('avg_rating', 'desc'),

            default => $this->builder->latest(),
        };
    }
}
