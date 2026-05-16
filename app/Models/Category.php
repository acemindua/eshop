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
    protected $appends = ['image'];

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
    /**
     * items
     */
    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'category_id', 'id');
    }
}
