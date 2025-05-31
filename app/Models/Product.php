<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany, HasManyThrough};
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Astrotomic\Translatable\{Contracts\Translatable as TranslatableContract, Translatable};
use Codebyray\ReviewRateable\Traits\ReviewRateable;
use Spatie\MediaLibrary\{HasMedia, InteractsWithMedia};
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements TranslatableContract, HasMedia
{
    use ReviewRateable, Translatable, SoftDeletes, InteractsWithMedia, HasFactory;

    /**
     * Translatable fields
     */
    public $translatedAttributes = [
        'title',
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
        'slug',
        'category_id',
        'sku',
        'price',
        'quantity',
        'manufacturer_id',
        'country_id',
        'public',
        'order',
        'user_id'
    ];

    /**
     * Automatically generate slug from title if missing
     */
    protected static function boot(): void
    {
        parent::boot();

        static::saving(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }

    /**
     * Apply filters to query
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter): Builder
    {
        return $filter->apply($builder);
    }

    /**
     * Return sorted images with preview URLs
     */
    public function getSortedImagesAttribute(): ?array
    {
        if (!$this->getFirstMediaUrl('images', 'preview')) {
            return null;
        }

        return $this->getMedia('images')
            ->sortBy('order_column')
            ->filter(fn($media) => File::exists($media->getPath()))
            ->map(fn($media) => [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'preview' => $media->getUrl('preview'),
                'name' => $media->file_name,
                'order_column' => $media->order_column,
            ])->values()->all();
    }

    /**
     * Define media relationship
     */
    public function images(): HasMany
    {
        return $this->morphMany(Media::class, 'model')
            ->where('collection_name', 'images')
            ->orderBy('order_column');
    }

    /**
     * Media conversion for preview images
     */
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->format('webp')
            ->fit(Fit::Contain, 1200, 1200)
            ->nonQueued();
    }

    // Relationships

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function manufacturer(): BelongsTo
    {
        return $this->belongsTo(Manufacturer::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function attributeValues(): HasManyThrough
    {
        return $this->hasManyThrough(
            AttributeValue::class,
            ProductVariant::class,
            'product_id',
            'id',
            'id',
            'attribute_value_id'
        );
    }

    /**
     * Returns a list of unique attribute values
     */
    public function getAttributesListAttribute()
    {
        return $this->variants
            ->pluck('attribute_value')
            ->filter()
            ->unique('id')
            ->values();
    }

    /**
     * (Optional) direct relation to a primary attribute
     */
    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class);
    }
}
