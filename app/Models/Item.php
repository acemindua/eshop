<?php

namespace App\Models;

use App\Filters\QueryFilter;
use App\Traits\HasSeo;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Codebyray\ReviewRateable\Traits\ReviewRateable;
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
    use Translatable, HasFactory, InteractsWithMedia, HasSeo;
    use ReviewRateable;

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
        'brand_id',
        'country',
        'quantity',
        'price',
        'old_price',
        'public',
        'order',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['sorted_images'];

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
    public function translations(): HasMany
    {
        return $this->hasMany(ItemTranslation::class);
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
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Return sorted images with preview URLs
     */
    public function getSortedImagesAttribute(): array
    {
        // Spatie за замовчуванням уже повертає медіа, відсортовані за 'order_column'
        $mediaCollection = $this->getMedia('images');

        if ($mediaCollection->isEmpty()) {
            return [];
        }

        return $mediaCollection
            // Замість sortBy використовуємо сортування через values() для скидання індексів
            // Якщо хочете перестрахуватися, сортуємо за order_column за зростанням
            ->map(fn($media) => [
                'id' => $media->id,
                'url' => $media->getUrl(),
                // Якщо конверсії 'preview' ще немає, підставляємо оригінальний URL як фоллбек
                'preview' => $media->hasGeneratedConversion('preview')
                    ? $media->getUrl('preview')
                    : $media->getUrl(),
                'name' => $media->file_name,
                'order' => (int) $media->order_column, // Приводимо до integer, щоб фронтенд чітко бачив число
            ])
            ->values() // Скидаємо ключі колекції в послідовні [0, 1, 2...]s
            ->all();
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


    /**
     * Прямий зв'язок з відгуками
     */
    public function reviews(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(\Codebyray\ReviewRateable\Models\Review::class, 'reviewable');
    }

    /**
     * Зв'язок з оцінками ЧЕРЕЗ відгуки
     */
    public function ratings(): \Illuminate\Database\Eloquent\Relations\HasManyThrough
    {
        return $this->hasManyThrough(
            \Codebyray\ReviewRateable\Models\Rating::class,
            \Codebyray\ReviewRateable\Models\Review::class,
            'reviewable_id', // Зовнішній ключ у таблиці reviews
            'review_id',     // Зовнішній ключ у таблиці ratings
            'id',            // Локальний ключ у таблиці items
            'id'             // Локальний ключ у таблиці reviews
        )->where('reviewable_type', Item::class);
    }
}
