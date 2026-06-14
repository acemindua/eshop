<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Category extends Model implements HasMedia, TranslatableContract
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
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    public function getImageAttribute()
    {
        if ($image = $this->getFirstMediaUrl('images', 'preview')) {
            $mediaImage = $this->getMedia('images')->first();
            if (File::exists($mediaImage->getPath())) {
                return $image;
            }
        }
    }

    /**
     * parent
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    /**
     * childs
     */
    public function childs(): HasMany
    {
        // Додаємо вкладеність, щоб будувати дерево будь-якої глибини
        return $this->hasMany(Category::class, 'category_id', 'id')
            ->with('childs')
            ->orderBy('order');
    }

    public function getAllChildrenIds(): array
    {
        // Кешуємо результат рекурсивної функції
        return Cache::remember("category_tree_{$this->id}", 3600, function () {
            return $this->resolveChildrenIds();
        });
    }

    /**
     * Допоміжний метод для рекурсії
     */
    protected function resolveChildrenIds(): array
    {
        $ids = [$this->id];

        // Переконуємося, що ми завантажили зв'язки (load)
        foreach ($this->childs as $child) {
            $ids = array_merge($ids, $child->resolveChildrenIds());
        }

        return $ids;
    }
    /**
     * items
     */
    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'category_id', 'id');
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
}
