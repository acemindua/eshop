<?php

namespace App\Filters;

class BrandFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder
            ->whereTranslationLike('title', '%' . $search . '%');
    }
}
