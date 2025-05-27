<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements TranslatableContract, HasMedia
{
    use Translatable, SoftDeletes, InteractsWithMedia, HasFactory;

    /**
     * The attributes that are translated.
     *
     * @var array<int, string>
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
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
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
        'user_id',
    ];

    /**
     * Boot the model.
     * Automatically generates slugs from titles if not set.
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }

    /**
     * Apply filters to query.
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter): Builder
    {
        return $filter->apply($builder);
    }

    /**
     * Get sorted image media items with preview URLs.
     *
     * @return array|null
     */
    public function getSortedImagesAttribute(): ?array
    {
        if ($this->getFirstMediaUrl('images', 'preview')) {
            return $this->getMedia('images')
                ->sortBy('order_column')
                ->filter(fn($media) => File::exists($media->getPath()))
                ->map(fn($media) => [
                    'id' => $media->id,
                    'url' => $media->getUrl(),
                    'preview' => $media->getUrl('preview'),
                    'name' => $media->file_name,
                    'order_column' => $media->order_column,
                ])
                ->values()
                ->all();
        }

        return null;
    }

    /**
     * Define morphMany relation to images collection.
     */
    public function images(): HasMany
    {
        return $this->morphMany(Media::class, 'model')
            ->where('collection_name', 'images')
            ->orderBy('order_column');
    }

    /**
     * Register media conversions (e.g., preview thumbnails).
     */
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->format('webp')
            ->fit(Fit::Contain, 1200, 1200)
            ->nonQueued();
    }

    /**
     * Category relationship.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Manufacturer relationship.
     */
    public function manufacturer(): BelongsTo
    {
        return $this->belongsTo(Manufacturer::class);
    }

    /**
     * Country relationship.
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    /**
     * Author (user) relationship.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Product variants relationship.
     */
    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    /**
     * Attributes relationship through product variants.
     */
    public function attributes(): HasManyThrough
    {
        return $this->hasManyThrough(
            Attribute::class,
            ProductVariant::class,
            'product_id',
            'id',
            'id',
            'attribute_id'
        );
    }

    /**
     * Attribute values relationship through product variants.
     */
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
}
