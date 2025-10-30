<?php

namespace App\Filters;

class UserFilter extends QueryFilter
{
    public function search($search = '')
    {
        return $this->builder
            ->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere("surname", "like", "%{$search}%")
            ->orWhere("email", "like", "%{$search}%")
            ->orWhere("phone", "like", "%{$search}%");
    }

    public function active($status = '')
    {
        $active = $status == 'active' ? 1 : null;
        return $this->builder
            ->where('email_verified_at', $active);
    }
}
