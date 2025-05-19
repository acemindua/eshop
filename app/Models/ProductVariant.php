<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'attribute_id',
        'attribute_value_id',
        'sku',
        'price',
        'quantity',
        'public',
        'order'
    ];

    /**
     * Get sorted image media items with preview URLs.
     *
     * @return array|null
     */
    public function getSortedImagesAttribute(): ?array
    {
        if ($this->getFirstMediaUrl('images', 'preview')) {
            return $this->getMedia('images')
                ->sortBy('order_column')
                ->filter(fn($media) => File::exists($media->getPath()))
                ->map(fn($media) => [
                    'id' => $media->id,
                    'url' => $media->getUrl(),
                    'preview' => $media->getUrl('preview'),
                    'name' => $media->file_name,
                    'order_column' => $media->order_column,
                ])
                ->values()
                ->all();
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
}
