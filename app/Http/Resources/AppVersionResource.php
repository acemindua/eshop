<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppVersionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $total = $this->items_count ?? $this->items->count();
        $completed = $this->completed_items_count ?? $this->items->where('is_completed', true)->count();

        // Визначаємо статус на рівні бекенду
        $status = 'draft';
        if ($total > 0) {
            $status = ($completed === $total) ? 'completed' : 'active';
        }

        return [
            'id' => $this->id,
            'version' => $this->version,
            'status' => $status, // Тепер Vue це побачить
            'released_at' => $this->released_at?->format('Y-m-d'),
            'released_at_human' => $this->released_at
                ? $this->released_at->diffForHumans()
                : null,
            'items_count' => (int)$total,
            'completed_items_count' => (int)$completed,
            'items' => $this->whenLoaded('items', function () {
                return $this->items->sortBy('sort_order')->values()->map(fn($item) => [
                    'id' => $item->id,
                    'content' => $item->content,
                    'type' => $item->type,
                    'is_completed' => (bool)$item->is_completed,
                ]);
            }),
        ];
    }
}
