<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Warehouse extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'city',
        'address',
        'map_link',
        'working_hours',
        'phone',
        'sort_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Create a new model instance pre-populated with default values for the frontend form.
     *
     * @return self
     */
    public static function makeWithDefaults(): self
    {
        return new self([
            'is_active' => true,
            'sort_order' => (self::max('sort_order') ?? 0) + 1,
        ]);
    }

    /**
     * The "booted" method of the model.
     * Sets up model event hooks.
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::creating(function (Warehouse $warehouse) {
            if (is_null($warehouse->sort_order)) {
                $warehouse->sort_order = (self::max('sort_order') ?? 0) + 1;
            }
        });
    }

    /**
     * Scope a query to apply custom request filters.
     *
     * @param Builder $builder
     * @param QueryFilter $filter
     * @return Builder
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter): Builder
    {
        return $filter->apply($builder);
    }

    /**
     * Scope a query to only include active warehouses ordered by their sorting sequence.
     *
     * @param Builder $query
     * @return void
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true)->orderBy('sort_order', 'asc');
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
     * Register the media collections for the model.
     *
     * @return void
     */
    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->format('webp')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
}
