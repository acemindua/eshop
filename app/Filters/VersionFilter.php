<?php

namespace App\Filters;

class VersionFilter extends QueryFilter
{
    /**
     * Пошук за номером версії
     */
    public function search($search = '')
    {
        return $this->builder->where('version', 'LIKE', '%' . $search . '%');
    }

    /**
     * Фільтр за статусом (active, completed, draft)
     * Дозволить робити URL типу: /admin/settings/versions?status=completed
     */
    public function status($status = '')
    {
        if (empty($status)) return $this->builder;

        return $this->builder->where('status', $status);
    }

    /**
     * Фільтр за активністю (is_active)
     */
    public function active($isActive = null)
    {
        if ($isActive === null) return $this->builder;

        return $this->builder->where('is_active', (bool)$isActive);
    }
}
