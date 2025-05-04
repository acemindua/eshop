<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Filters\QueryFilter;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Traits\HasRoles;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use SpatiePermissionsToVueInertia\Traits\SpatiePermissionsToVue;

class User extends Authenticatable implements HasMedia
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasRoles;
    use SoftDeletes;
    use InteractsWithMedia;
    use SpatiePermissionsToVue;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'surname',
        'phone',
        'description',
        'last_seen'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $except = [
        'phone',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['avatar', 'full_name'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Filters
     */
    public function scopeFilter(Builder $builder, QueryFilter $filter)
    {
        return $filter->apply($builder);
    }

    /**
     * @return bool
     */
    public function online()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    /**
     * @return string
     */
    public function getFullNameAttribute()
    {
        return ucwords("{$this->name} {$this->surname}");
    }

    /**
     * get Phone number
     */
    public function getPhoneAttribute($value)
    {
        if ($value)
            return substr(preg_replace('/[^0-9]/', '', $value), -10, -7) . " " . substr(preg_replace('/[^0-9]/', '', $value), -7, -4) . " " . substr(preg_replace('/[^0-9]/', '', $value), -4);
        return null;
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    public function getAvatarAttribute()
    {
        if ($image = $this->getFirstMediaUrl('avatars', 'preview')) {
            $mediaImage = $this->getMedia('avatars')->first();
            if (File::exists($mediaImage->getPath())) {
                return $image;
            }
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
