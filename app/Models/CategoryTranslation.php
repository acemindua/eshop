<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CategoryTranslation extends Model
{
    //
    public $timestamps = false;

    protected $fillable = ['title', 'slug', 'description', 'content'];

    // Автоматично генерує slug з title перед збереженням
    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }
}
