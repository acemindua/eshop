<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class TranslationController extends Controller
{
    protected string $langPath;
    protected array $locales;

    public function __construct()
    {
        $this->langPath = base_path('lang');
        $this->locales = config('translatable.locales') ?: ['uk', 'en'];
    }

    /**
     * Швидке відображення списку перекладів з JSON файлів
     */
    public function index(Request $request)
    {
        $allTranslations = [];

        foreach ($this->locales as $locale) {
            $filePath = "{$this->langPath}/{$locale}.json";
            $translations = [];

            if (File::exists($filePath)) {
                $translations = json_decode(File::get($filePath), true) ?: [];
            }

            foreach ($translations as $key => $value) {
                if (!isset($allTranslations[$key])) {
                    $allTranslations[$key] = [
                        'key' => $key,
                        'values' => array_fill_keys($this->locales, '')
                    ];
                }
                $allTranslations[$key]['values'][$locale] = $value;
            }
        }

        $translationsArray = array_values($allTranslations);

        // Сортування: спочатку ті, де є хоч одне порожнє поле, далі за алфавітом
        usort($translationsArray, function ($a, $b) {
            $aEmpty = $this->hasEmptyValue($a['values']);
            $bEmpty = $this->hasEmptyValue($b['values']);

            if ($aEmpty && !$bEmpty) return -1;
            if (!$aEmpty && $bEmpty) return 1;

            return strcmp($a['key'], $b['key']);
        });

        return Inertia::render('Admin/Settings/Translations/Form', [
            'translations' => $translationsArray,
        ]);
    }

    /**
     * Ручний пошук нових ключів у ресурсах ресурсу js/vue
     */
    public function sync()
    {
        $directory = resource_path('js');
        if (!File::exists($directory)) {
            return back()->with('error', 'Директорію js не знайдено');
        }

        $foundKeys = [];
        $files = File::allFiles($directory);

        foreach ($files as $file) {
            if (!in_array($file->getExtension(), ['vue', 'js', 'jsx'])) {
                continue;
            }

            $content = $file->getContents();

            // Пошук конструкцій $t('...') або __('...')
            preg_match_all('/(?:\$t|__)\s*\(\s*[\'"](.+?)[\'"]\s*\)/', $content, $matches);

            if (!empty($matches[1])) {
                foreach ($matches[1] as $key) {
                    if (str_contains($key, "'") || str_contains($key, "+") || str_contains($key, "`")) {
                        continue;
                    }
                    $foundKeys[] = $key;
                }
            }
        }

        $foundKeys = array_unique($foundKeys);

        foreach ($this->locales as $locale) {
            $filePath = "{$this->langPath}/{$locale}.json";
            $existing = [];

            if (File::exists($filePath)) {
                $existing = json_decode(File::get($filePath), true) ?: [];
            }

            $changed = false;
            foreach ($foundKeys as $key) {
                // Нові ключі створюються ПУСТИМИ, щоб спрацьовували фільтри та підсвічування
                if (!isset($existing[$key])) {
                    $existing[$key] = "";
                    $changed = true;
                }
            }

            if ($changed) {
                $this->saveToJson($locale, $existing);
            }
        }

        return back()->with('success', 'Сканування завершено успішно!');
    }

    /**
     * Масове збереження ключів з форми
     */
    public function updateAll(Request $request)
    {
        $items = $request->input('items', []);
        $dataByLocale = [];

        foreach ($items as $item) {
            foreach ($this->locales as $locale) {
                $value = isset($item['values'][$locale]) ? trim((string)$item['values'][$locale]) : '';
                $dataByLocale[$locale][$item['key']] = $value;
            }
        }

        foreach ($dataByLocale as $locale => $translations) {
            $this->saveToJson($locale, $translations);
        }

        return back()->with('success', 'Переклади успішно збережено');
    }

    private function hasEmptyValue(array $values): bool
    {
        foreach ($values as $val) {
            if (empty(trim((string) $val))) return true;
        }
        return false;
    }

    private function saveToJson(string $locale, array $data): void
    {
        ksort($data);
        $path = "{$this->langPath}/{$locale}.json";
        File::put($path, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }
}