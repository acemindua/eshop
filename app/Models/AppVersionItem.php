<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppVersionItem extends Model
{
    protected $fillable = ['app_version_id', 'content', 'type', 'category', 'is_completed', 'sort_order'];

    public function version(): BelongsTo
    {
        // Вказуємо правильну колонку 'app_version_id'
        return $this->belongsTo(AppVersion::class, 'app_version_id');
    }
}
