<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = ['name', 'slug'];

    /**
     * Отримуємо всі пункти меню (пласким списком)
     */
    public function items()
    {
        return $this->hasMany(MenuItem::class)->orderBy('order');
    }

    /**
     * Отримуємо тільки кореневі пункти з усіма вкладеними дітьми
     * Це дозволить у контролері просто написати Menu::with('tree')->get()
     */
    public function tree()
    {
        return $this->hasMany(MenuItem::class)
            ->whereNull('parent_id')
            ->with('children') // Цей метод має бути в MenuItem.php
            ->orderBy('order');
    }

    /**
     * Допоміжний атрибут (якщо хочеш звертатися $menu->tree_list)
     */
    public function getTreeListAttribute()
    {
        return $this->items()
            ->whereNull('parent_id')
            ->with('children')
            ->get();
    }
}
