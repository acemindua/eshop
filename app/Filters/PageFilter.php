<?php

namespace App\Filters;

class PageFilter extends QueryFilter
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
                ->join('page_translations', function ($join) {
                    $join->on('pages.id', '=', 'page_translations.page_id')
                        ->where('page_translations.locale', '=', app()->getLocale());
                })
                // Сортуємо за полем із приєднаної таблиці
                ->orderBy('page_translations.title', $direction)
                // Важливо: вибираємо лише поля основної таблиці, щоб не було конфліктів ID
                ->select('pages.*');
        }

        return $this->builder->orderBy($value, $direction);
    }
}
