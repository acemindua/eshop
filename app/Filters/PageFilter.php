<?php

namespace App\Filters;

class PageFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder
            ->whereTranslationLike('title', '%' . $search . '%');
    }
}
