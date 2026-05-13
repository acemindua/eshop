<?php

namespace App\Filters;

class UserFilter extends QueryFilter
{
    /**
     * Глобальний пошук за кількома полями
     * Використовуємо групування, щоб OR умови не конфліктували з іншими фільтрами
     */
    public function search($search = '')
    {
        if (empty($search)) return $this->builder;

        return $this->builder->where(function ($query) use ($search) {
            $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('last_name', 'LIKE', '%' . $search . '%')
                ->orWhere('middle_name', 'LIKE', '%' . $search . '%')
                ->orWhere('email', 'LIKE', '%' . $search . '%')
                ->orWhere('phone', 'LIKE', '%' . $search . '%');
        });
    }

    /**
     * Фільтр за статусом верифікації Email
     */
    public function active($status = '')
    {
        if ($status === 'active') {
            return $this->builder->whereNotNull('email_verified_at');
        }
        
        if ($status === 'inactive') {
            return $this->builder->whereNull('email_verified_at');
        }

        return $this->builder;
    }

    /**
     * Фільтр "Онлайн"
     * @param string|int $status ('1' або '0')
     */
    public function online($status = '')
    {
        if ($status === '') return $this->builder;

        // Визначаємо поріг (наприклад, останні 5 хвилин)
        $threshold = now()->subMinutes(5);

        if ($status == '1') {
            return $this->builder->where('last_activity', '>=', $threshold);
        }

        if ($status == '0') {
            return $this->builder->where(function ($query) use ($threshold) {
                $query->where('last_activity', '<', $threshold)
                      ->orWhereNull('last_activity');
            });
        }

        return $this->builder;
    }
}