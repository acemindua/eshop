<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray($request): array
    {

        $user = User::find($this->user_id);

        return [
            'id' => $this->id,
            'review' => $this->review,
            'user_id' => $this->user_id,
            'user_name' =>  $user ?  $user->name : '',
            'created_at' => $this->created_at->format('d.m.Y'),
            // Отримуємо значення "overall" оцінки з вкладеного масиву
            'rating' => optional($this->ratings->where('key', 'overall')->first())->value,
        ];
    }
}
