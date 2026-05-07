<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasMedia
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, InteractsWithMedia, HasRoles;

    /**
     * Атрибути, які можна масово заповнювати.
     */
    protected $fillable = [
        'name',                // Ім'я
        'last_name',           // Прізвище
        'middle_name',         // По-батькові
        'email',
        'password',
        'phone',
        'birthday',            // Дата народження
        'gender',              // Стать
        'bonus_balance',       // Бонуси
        'newsletter_accepted', // Згода на розсилку
        'last_activity',       // Останній вхід
        'provider',            // Socialite: google, facebook тощо
        'provider_id',         // Socialite ID
        'preferred_locale',    // uk/en
        'default_city_ref',    // Для Нової Пошти
        'default_warehouse_ref' // Для Нової Пошти
    ];

    /**
     * Приховані атрибути.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Приведення типів (Casting).
     */
    protected function casts(): array
    {
        return [
            'email_verified_at'     => 'datetime',
            'password'              => 'hashed',
            'birthday'              => 'date',
            'newsletter_accepted'   => 'boolean',
            'bonus_balance'         => 'decimal:2',
            'last_activity'         => 'datetime',
            'birthday'              => 'date:Y-m-d',
        ];
    }

    /**
     * Поля, які додаються до JSON-відповіді.
     */
    protected $appends = ['avatar', 'full_name'];

    /**
     * Фільтрація запитів.
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }

    /**
     * Перевірка чи користувач онлайн.
     */
    public function online()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    /**
     * Аксесор для ПІБ.
     * Повертає "Прізвище Ім'я По-батькові" з великої літери.
     */
    public function getFullNameAttribute()
    {
        return collect([$this->last_name, $this->name, $this->middle_name])
            ->filter()
            ->map(fn($name) => mb_convert_case($name, MB_CASE_TITLE, "UTF-8"))
            ->implode(' ');
    }

    /**
     * Аксесор для аватара.
     */
    public function getAvatarAttribute()
    {
        if ($image = $this->getFirstMediaUrl('avatars', 'preview')) {
            $mediaImage = $this->getMedia('avatars')->first();
            if ($mediaImage && File::exists($mediaImage->getPath())) {
                return $image;
            }
        }
        // Можна додати дефолтний аватар тут, якщо файл відсутній
        return null;
    }

    /**
     * Конвертація медіафайлів (Spatie Media Library).
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
