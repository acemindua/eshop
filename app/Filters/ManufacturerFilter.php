<?php

namespace App\Filters;

class ManufacturerFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder
            ->whereTranslationLike('title', '%' . $search . '%');
    }
}
