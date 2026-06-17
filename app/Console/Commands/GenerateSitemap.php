<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Category;
use App\Models\Item;
use App\Models\Page;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Генерація XML карти сайту';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = Sitemap::create();
        $sitemap->add(Url::create('/')->setPriority(1.0));

        // Доступні мови (наприклад, ['uk', 'en'])
        $locales = array_keys(LaravelLocalization::getSupportedLocales());

        // Функція для додавання перекладених посилань
        $addTranslatedUrl = function ($item, $priority, $routeName) use ($sitemap, $locales) {
            // Використовуємо першу мову як основну (canonical)
            $mainLocale = $locales[0];

            $url = Url::create(LaravelLocalization::getLocalizedURL($mainLocale, route($routeName, $item->slug, false)));

            // Додаємо альтернативні посилання (hreflang) для інших мов
            foreach ($locales as $locale) {
                if ($locale !== $mainLocale) {
                    $localizedUrl = LaravelLocalization::getLocalizedURL($locale, route($routeName, $item->slug, false));
                    $url->addAlternate($localizedUrl, $locale);
                }
            }

            $url->setLastModificationDate($item->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority($priority);

            $sitemap->add($url);
        };

        // Обробка моделей
        $models = [
            ['query' => Category::query(), 'priority' => 0.8, 'route' => 'resolve.route'],
            ['query' => Item::query(), 'priority' => 0.6, 'route' => 'resolve.route'],
            ['query' => Page::query(), 'priority' => 0.5, 'route' => 'resolve.route'],
        ];

        foreach ($models as $m) {
            foreach ($m['query']->cursor() as $model) {
                $addTranslatedUrl($model, $m['priority'], $m['route']);
            }
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
        $this->info('Карта сайту з перекладами успішно згенерована!');
    }
}
