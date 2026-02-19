<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'review' => $this->review,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->format('d.m.Y'),
            // Отримуємо значення "overall" оцінки з вкладеного масиву
            'rating' => optional($this->ratings->where('key', 'overall')->first())->value,
        ];
    }
}
