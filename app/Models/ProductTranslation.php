<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * ProductTranslation model.
 *
 * Handles localized attributes for a product such as title, slug, description, and content.
 */
class ProductTranslation extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords'
    ];
}
