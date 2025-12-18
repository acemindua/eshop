<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    // Дозволені поля для масового присвоєння
    protected $fillable = [
        'key',
        'value',
        'description', // Якщо ви додали це поле
    ];

    // Додатково: Кастинг для автоматичного перетворення value
    // Якщо ви плануєте зберігати JSON або масиви, використовуйте 'array' або 'json'
    protected $casts = [
        // 'value' => 'array', 
    ];
}
