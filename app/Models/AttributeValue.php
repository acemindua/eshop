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
use Illuminate\Support\Str;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class AttributeValue extends Model implements TranslatableContract, HasMedia
{
    //
    use Translatable;
    use SoftDeletes;
    use InteractsWithMedia;
    use HasFactory;

    public $translatedAttributes = ['title', 'slug', 'description'];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['attribute_id', 'order', 'public'];
    //

    /**
     * Boot the model.
     * Automatically generates slugs from titles if not set.
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($product) {
            foreach (LaravelLocalization::getSupportedLocales() as $locale => $properties) {
                $translated = $product->translateOrNew($locale);

                if (empty($translated->slug) && !empty($translated->title)) {
                    $translated->slug = Str::slug($translated->title);
                }
            }
        });
    }
}
