<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\File;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Manufacturer extends Model implements TranslatableContract, HasMedia
{
    //
    use Translatable;
    use SoftDeletes;
    use InteractsWithMedia;
    use HasFactory;

    public $translatedAttributes = ['title', 'slug', 'description', 'content'];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['public', 'order', 'user_id'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['images'];

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
    public function getImagesAttribute()
    {
        if ($image = $this->getFirstMediaUrl('images', 'preview')) {
            $mediaImage = $this->getMedia('images')->first();
            $arr = collect();
            if (File::exists($mediaImage->getPath())) {
                $arr->push([
                    'id'            => $mediaImage->id,
                    'url'           => $mediaImage->getUrl(),
                    'preview'       => $mediaImage->getUrl('preview'),
                    'name'          => $mediaImage->file_name,
                    'order_column'  => $mediaImage->order_column,
                ]);
            }
            return $arr;
        }
    }

    /**
     *
     */
    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->format('webp') // this was updated
            ->fit(Fit::Contain, 120, 120)
            ->nonQueued();
    }
}
