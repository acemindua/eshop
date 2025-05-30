<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\{Model, Builder, SoftDeletes, Factories\HasFactory};
use Illuminate\Support\Str;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Astrotomic\Translatable\{Contracts\Translatable as TranslatableContract, Translatable};

class Attribute extends Model implements TranslatableContract
{
    use Translatable, SoftDeletes, HasFactory;

    /**
     * Fields that support translation
     */
    public $translatedAttributes = ['title', 'slug', 'description'];

    /**
     * Fields that can be mass-assigned
     */
    protected $fillable = ['order', 'public'];

    /**
     * Apply custom query filters to the model
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter): Builder
    {
        return $filter->apply($builder);
    }

    /**
     * Automatically generate slugs for translations if missing
     */
    protected static function boot(): void
    {
        parent::boot();

        static::saving(function ($attribute) {
            foreach (LaravelLocalization::getSupportedLocales() as $locale => $properties) {
                $translated = $attribute->translateOrNew($locale);

                if (empty($translated->slug) && !empty($translated->title)) {
                    $translated->slug = Str::slug($translated->title);
                }
            }
        });
    }
}
