<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SearchHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'query',
        'ip_address',
    ];

    /**
     * Користувач, що зробив пошук (необов’язковий)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
