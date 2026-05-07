<?php

namespace App\Http\Controllers\Admin;

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
        // Встановлюємо локалі (uk, en тощо)
        $this->locales = config('translatable.locales') ?: ['uk', 'en'];
    }

    public function index(Request $request)
    {
        // 1. Автоматично шукаємо нові ключі в JS/Vue перед рендерингом
        $this->runAutoScan();

        $allTranslations = [];

        // 2. Зчитуємо JSON файли для кожної локалі
        foreach ($this->locales as $locale) {
            $filePath = "{$this->langPath}/{$locale}.json";

            $translations = [];
            if (File::exists($filePath)) {
                $translations = json_decode(File::get($filePath), true) ?: [];
            }

            foreach ($translations as $key => $value) {
                if (!isset($allTranslations[$key])) {
                    $allTranslations[$key] = [
                        'key'    => $key,
                        'values' => array_fill_keys($this->locales, '')
                    ];
                }
                $allTranslations[$key]['values'][$locale] = $value;
            }
        }

        $translationsArray = array_values($allTranslations);

        // 3. Сортування: спочатку порожні, потім за алфавітом
        usort($translationsArray, function ($a, $b) {
            $aEmpty = $this->hasEmptyValue($a['values']);
            $bEmpty = $this->hasEmptyValue($b['values']);

            if ($aEmpty && !$bEmpty) return -1;
            if (!$aEmpty && $bEmpty) return 1;

            return strcmp($a['key'], $b['key']);
        });

        return Inertia::render('Admin/Translations/Index', [
            'translations' => $translationsArray,
            'locales'      => $this->locales,
        ]);
    }

    private function hasEmptyValue(array $values): bool
    {
        foreach ($values as $val) {
            if (empty(trim((string)$val))) return true;
        }
        return false;
    }

    private function runAutoScan()
    {
        $directory = resource_path('js');
        if (!File::exists($directory)) return;

        $foundKeys = [];
        $files = File::allFiles($directory);

        foreach ($files as $file) {
            if (!in_array($file->getExtension(), ['vue', 'js', 'jsx'])) continue;

            $content = $file->getContents();

            // Регулярка для $t('Key') або __('Key') з урахуванням пробілів
            preg_match_all('/(?:\$t|__)\s*\(\s*[\'"](.+?)[\'"]\s*\)/', $content, $matches);

            if (!empty($matches[1])) {
                foreach ($matches[1] as $key) {
                    // Ігноруємо динамічні ключі зі змінними (наприклад, $t('status.' + id))
                    if (str_contains($key, "'") || str_contains($key, "+")) continue;
                    $foundKeys[] = $key;
                }
            }
        }

        $foundKeys = array_unique($foundKeys);

        // Оновлюємо кожен JSON файл
        foreach ($this->locales as $locale) {
            $filePath = "{$this->langPath}/{$locale}.json";

            $existing = [];
            if (File::exists($filePath)) {
                $existing = json_decode(File::get($filePath), true) ?: [];
            }

            $changed = false;
            foreach ($foundKeys as $key) {
                // ЗМІНА ТУТ: 
                // Якщо ключа взагалі немає АБО він порожній — записуємо ключ як значення
                if (!isset($existing[$key]) || trim((string)$existing[$key]) === '') {
                    $existing[$key] = $key;
                    $changed = true;
                }
            }

            if ($changed) {
                $this->saveToJson($locale, $existing);
            }
        }
    }

    private function saveToJson(string $locale, array $data): void
    {
        ksort($data);
        $path = "{$this->langPath}/{$locale}.json";

        // Зберігаємо з гарним форматуванням та підтримкою кирилиці
        File::put($path, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    public function updateAll(Request $request)
    {
        $items = $request->input('items', []);
        $dataByLocale = [];

        foreach ($items as $item) {
            foreach ($this->locales as $locale) {
                $dataByLocale[$locale][$item['key']] = $item['values'][$locale] ?? '';
            }
        }

        foreach ($dataByLocale as $locale => $translations) {
            $this->saveToJson($locale, $translations);
        }

        return back()->with('success', 'JSON переклади оновлено');
    }
}
