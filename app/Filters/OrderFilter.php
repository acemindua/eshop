<?php

namespace App\Filters;

class OrderFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder
            ->where('name', 'LIKE', '%' . $search . '%');
        //->orWhere("phone", "like", "%{$search}%");
        //->orWhere("surname", "like", "%{$search}%")
    }
}
