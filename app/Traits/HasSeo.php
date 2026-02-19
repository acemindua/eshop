<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSeo
{
    public function getSeoMetadata(): array
    {
        // Astrotomic дозволяє отримати переклад для поточної локалі просто так:
        $translation = $this->translate();

        if (!$translation) {
            return [
                'title' => config('app.name'),
                'description' => '',
                'og_image' => asset('default-og.jpg'),
                'canonical' => request()->url(),
            ];
        }

        return [
            'title'       => $translation->meta_title ?: ($translation->title ?: config('app.name')),
            'description' => $translation->meta_description ?: Str::limit(strip_tags($translation->content ?? $translation->description ?? ''), 155),
            'keywords'    => $translation->meta_keywords ?? '',
            'og_image'    => method_exists($this, 'getFirstMediaUrl')
                ? ($this->getFirstMediaUrl('images') ?: asset('default-og.jpg'))
                : asset('default-og.jpg'),
            'canonical'   => request()->url(),
        ];
    }
}
