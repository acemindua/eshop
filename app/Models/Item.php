<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Item extends Model implements HasMedia, TranslatableContract
{

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use Translatable, HasFactory, InteractsWithMedia;

    /**
     * The attributes that are translated.
     *
     * @var array<int, string>
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
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'manufacturer_id',
        'country',
        'quantity',
        'price',
        'public',
        'order',
    ];

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
     * Filters
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }

    /**
     * 
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * 
     */
    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class);
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
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
}
