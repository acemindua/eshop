<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Manufacturer extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'country',
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
     * Filters
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);

        static::saving(function ($manufacturer) {
            if (empty($manufacturer->slug)) {
                // Генеруємо, тільки якщо поле очистили або воно нове
                $slug = Str::slug($manufacturer->title);
                $count = static::where('slug', 'LIKE', "{$slug}%")
                    ->where('id', '!=', $manufacturer->id)
                    ->count();
                $manufacturer->slug = $count ? "{$slug}-{$count}" : $slug;
            }
        });
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
     * Auto-generates slugs based on title if empty
     */
    protected static function boot(): void
    {
        parent::boot();
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
     * Отримати всі товари цього виробника
     */
    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
}
