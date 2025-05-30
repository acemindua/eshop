<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\{Builder, SoftDeletes, Factories\HasFactory};
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Astrotomic\Translatable\{Contracts\Translatable as TranslatableContract, Translatable};
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Spatie\MediaLibrary\{HasMedia, InteractsWithMedia};
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AttributeValue extends Model implements TranslatableContract, HasMedia
{
    use Translatable, SoftDeletes, InteractsWithMedia, HasFactory;

    /**
     * Translatable fields
     */
    public $translatedAttributes = ['title', 'slug', 'description'];

    /**
     * Mass assignable fields
     */
    protected $fillable = ['attribute_id', 'order', 'public'];

    /**
     * Auto-generates slugs based on title if empty
     */
    protected static function boot(): void
    {
        parent::boot();

        static::saving(function ($attributeValue) {
            foreach (LaravelLocalization::getSupportedLocales() as $locale => $properties) {
                $translated = $attributeValue->translateOrNew($locale);

                if (empty($translated->slug) && !empty($translated->title)) {
                    $translated->slug = Str::slug($translated->title);
                }
            }
        });
    }

    /**
     * Define relationship to attribute
     */
    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class);
    }

    /**
     * (Optional) Media conversions for attribute value
     */
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->format('webp')
            ->fit(Fit::Contain, 256, 256)
            ->nonQueued();
    }
}
