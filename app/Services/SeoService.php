<?php

namespace App\Services;

use Spatie\MediaLibrary\HasMedia;

class SeoService
{
    protected string $appName;

    public function __construct()
    {
        $this->appName = config('app.name', 'App');
    }

    /**
     * Формує SEO-дані для сторінки.
     *
     * @param  mixed  $data
     *      - модель (HasMedia|array|object) або масив з ключами title, description, status, content, url, image_url
     * @return array
     */
    public function generate($data): array
    {
        // Якщо передана модель, спробуємо дістати дані з неї
        if (is_object($data)) {
            $title = $data->title ?? ($data->meta_title ?? '');
            $description = $data->meta_description ?? $data->description ?? null;
            $status = $data->status ?? true;
            $content = $data->content ?? null;
            $url = $data->url ?? url()->current();

            $imageUrl = null;
            if ($data instanceof HasMedia) {
                $media = $data->getFirstMedia();
                if ($media) {
                    $imageUrl = $media->getFullUrl();
                }
            }
        } elseif (is_array($data)) {
            $title = $data['title'] ?? '';
            $description = $data['description'] ?? null;
            $status = $data['status'] ?? true;
            $content = $data['content'] ?? null;
            $url = $data['url'] ?? url()->current();
            $imageUrl = $data['image_url'] ?? null;
        } else {
            // Невідомий формат даних
            $title = '';
            $description = null;
            $status = true;
            $content = null;
            $url = url()->current();
            $imageUrl = null;
        }

        // Якщо нема опису, намагаємось обрізати контент
        if (!$description && $content) {
            $description = mb_substr(strip_tags($content), 0, 160);
        }

        // Якщо нема зображення, ставимо дефолтний логотип
        if (!$imageUrl) {
            $imageUrl = asset('images/logo.jpg');
        }

        return [
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'image_url' => $imageUrl,
            'url' => $url,
            'app_name' => $this->appName,
        ];
    }
}
