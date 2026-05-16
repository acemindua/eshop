<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'menu_id',
        'parent_id',
        'label',
        'model_id',
        'model_type',
        'url',
        'order'
    ];

    // Також переконайся, що label обробляється як масив (якщо використовуєш JSON для перекладів)
    protected $casts = [
        'label' => 'array',
    ];

    public function model()
    {
        return $this->morphTo();
    }
    public function children()
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->with('children')->orderBy('order');
    }

    public function parent()
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }
}
