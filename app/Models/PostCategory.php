<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Astrotomic\Translatable\{Contracts\Translatable as TranslatableContract, Translatable};

class PostCategory extends Model implements TranslatableContract
{
    use Translatable, SoftDeletes, HasFactory;

    /**
     * Translatable fields
     */
    public $translatedAttributes = [
        'title',
        'slug',
        'description',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords'
    ];

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'category_id',
        'public',
        'order',
        'user_id'
    ];
}
