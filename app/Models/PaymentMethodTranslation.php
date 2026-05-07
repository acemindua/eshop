<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethodTranslation extends Model
{
    /**
     * Вимикаємо таймстемпи, оскільки вони зазвичай 
     * контролюються основною таблицею payment_methods.
     */
    public $timestamps = false;

    /**
     * Дозволяємо масове заповнення для полів, 
     * що містять локалізований контент.
     */
    protected $fillable = [
        'title',
        'description',
        'payment_details',
    ];
}
