<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Model;
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

class ProductVariant extends Model implements HasMedia
{
    //
    use SoftDeletes;
    use InteractsWithMedia;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'sku',
        'price',
        'quantity',
        'public',
        'order'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    public function getImageAttribute()
    {
        /* if ($image = $this->getFirstMediaUrl('images', 'preview')) {
            $mediaImage = $this->getMedia('images')->first();
            if (File::exists($mediaImage->getPath())) {
                return $image;
            }
        } */

        if ($image = $this->getFirstMediaUrl('images', 'preview')) {
            return $this->getMedia('images')
                ->sortBy('order_column') // сортування за order_column
                ->filter(function ($media) {
                    return File::exists($media->getPath()); // перевірка існування файлу
                })
                ->map(function ($media) {
                    return [
                        'id' => $media->id,
                        'url' => $media->getUrl(),
                        'preview' => $media->getUrl('preview'), // ось тут прев’ю
                        //'path' => $media->getPath(),
                        'name' => $media->file_name,
                        'order_column' => $media->order_column,
                    ];
                })
                ->values()
                ->all(); // повертає звичайний масив
        }

        return null;
    }

    /**
     *
     */
    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->format('webp') // this was updated
            ->fit(Fit::Contain, 256, 256)
            ->nonQueued();
    }

    /**
     * 
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['attribute_value_title'];

    /**
     * Визначення зв'язку з `AttributeValue`.
     */
    public function attribute_value(): BelongsTo
    {
        return $this->belongsTo(AttributeValue::class, 'attribute_value_id', 'id');
    }

    /**
     * Accessor для атрибута `title` з моделі `AttributeValue`.
     */
    public function getAttributeValueTitleAttribute(): ?string
    {
        // Перевіряємо, чи є зв'язок і повертаємо title, якщо є
        return $this->attribute_value ? $this->attribute_value->title : null;
    }

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }

    public function attributeValue(): BelongsTo
    {
        return $this->belongsTo(AttributeValue::class, 'attribute_value_id');
    }

    public function values()
    {
        return $this->hasMany(ProductVariantValue::class);
    }
}
