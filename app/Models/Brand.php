<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Важливий імпорт
use Spatie\Image\Enums\Fit;
use Illuminate\Support\Facades\File;

class Brand extends Model implements HasMedia, TranslatableContract
{
    use Translatable, HasFactory, InteractsWithMedia;

    public $translatedAttributes = [
        'title',
        'slug',
        'description',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords'
    ];

    protected $fillable = [
        'country',
        'public',
        'order',
    ];

    protected $appends = ['image'];

    protected static function boot(): void
    {
        parent::boot();

        static::saving(function ($brand) {
            foreach (LaravelLocalization::getSupportedLocales() as $locale => $properties) {
                $translated = $brand->translateOrNew($locale);

                // ВИПРАВЛЕНО: було 'name', змінено на 'title', щоб відповідало міграції
                if (empty($translated->slug) && !empty($translated->title)) {
                    $translated->slug = Str::slug($translated->title);
                }
            }
        });
    }

    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }

    // Додаємо відсутній зв'язок з Item для повноти архітектури
    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function getImageAttribute()
    {
        if ($image = $this->getFirstMediaUrl('images', 'preview')) {
            $mediaImage = $this->getMedia('images')->first();
            if ($mediaImage && File::exists($mediaImage->getPath())) {
                return $image;
            }
        }
        return null;
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->format('webp')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
}
