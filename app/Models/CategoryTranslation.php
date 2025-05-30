<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryTranslation extends Model
{
    //
    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords'
    ];
}
