<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Astrotomic\Translatable\{Contracts\Translatable as TranslatableContract, Translatable};
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'post_category_id',
        'public',
        'order',
        'user_id'
    ];

    // Relationships

    public function parent(): BelongsTo
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id', 'id');
    }

    public function childs(): HasMany
    {
        return $this->hasMany(PostCategory::class)->with('childs');
    }

    /**
     * 
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
