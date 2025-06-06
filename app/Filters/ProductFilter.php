<?php

namespace App\Filters;

class ProductFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder->where(function ($query) use ($search) {
            $query->where('sku', 'like', '%' . $search . '%')
                ->orWhereTranslationLike('title', '%' . $search . '%');
        });
    }

    // Search to Main
    public function q($search = '')
    {
        return $this->builder->where(function ($query) use ($search) {
            $query->where('sku', 'like', '%' . $search . '%')
                ->orWhereTranslationLike('title', '%' . $search . '%')
                ->orWhereTranslationLike('description', '%' . $search . '%');
        });
    }
}
