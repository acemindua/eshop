<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            // Формуємо дерево посилань (зв'язок items має повертати відсортовану структуру)
            'tree' => $this->formatTree($this->items),
        ];
    }

    /**
     * Рекурсивно форматуємо елементи меню для фронтенду
     */
    protected function formatTree($items): array
    {
        return $items->map(function ($item) {
            return [
                'id' => $item->id,
                'parent_id' => $item->parent_id,
                'order' => $item->order,
                'label' =>  $item->label,
                'url' => $item->url,
                'model_type' => $item->model_type ? class_basename($item->model_type) : null, // Наприклад, поверне 'Page' замість 'App\Models\Page'
                'model_id' => $item->model_id,
                'children' => $item->children ? $this->formatTree($item->children) : [],
            ];
        })->toArray();
    }
}
