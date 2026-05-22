<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

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
     * Display a listing of the translations from JSON files.
     */
    public function index(Request $request): Response
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

        // Sort: items with at least one empty translation first, then alphabetically by key
        usort($translationsArray, function (array $a, array $b): int {
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
     * Scan JS/Vue/TS resources for new translation keys.
     */
    public function sync(): RedirectResponse
    {
        $directory = resource_path('js');
        if (!File::exists($directory)) {
            return back()->with('error', 'The "js" resources directory was not found.');
        }

        // Ensure the localization directory exists
        if (!File::exists($this->langPath)) {
            File::makeDirectory($this->langPath, 0755, true);
        }

        $foundKeys = [];
        $files = File::allFiles($directory);
        $allowedExtensions = ['vue', 'js', 'jsx', 'ts', 'tsx'];

        foreach ($files as $file) {
            if (!in_array($file->getExtension(), $allowedExtensions, true)) {
                continue;
            }

            $content = $file->getContents();

            // Match both $t('...') and __('...') supporting single and double quotes cleanly
            preg_match_all('/(?:\$t|__)\s*\(\s*(?:\'([^\']+)\'|"([^"]+)")\s*\)/', $content, $matches);

            // Merge matches from single quotes (index 1) and double quotes (index 2)
            $mergedMatches = array_merge(array_filter($matches[1]), array_filter($matches[2]));

            foreach ($mergedMatches as $key) {
                // Skip dynamic keys, concatenations, or template literals
                if (preg_match('/[\'"+`]/', $key)) {
                    continue;
                }
                $foundKeys[] = $key;
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
                // New keys are initialized as empty strings to trigger filters/highlights in UI
                if (!isset($existing[$key])) {
                    $existing[$key] = "";
                    $changed = true;
                }
            }

            if ($changed) {
                $this->saveToJson($locale, $existing);
            }
        }

        return back()->with('success', 'Scan completed successfully!');
    }

    /**
     * Bulk update translation keys without deleting unsubmitted values.
     */
    public function updateAll(Request $request): RedirectResponse
    {
        $items = $request->input('items', []);

        if (empty($items) || !is_array($items)) {
            return back()->with('error', 'Invalid or empty translation data provided.');
        }

        foreach ($this->locales as $locale) {
            $filePath = "{$this->langPath}/{$locale}.json";
            $currentTranslations = [];

            if (File::exists($filePath)) {
                $currentTranslations = json_decode(File::get($filePath), true) ?: [];
            }

            $hasChanges = false;

            foreach ($items as $item) {
                if (!isset($item['key']) || trim((string)$item['key']) === '') {
                    continue;
                }

                $key = $item['key'];
                $newValue = isset($item['values'][$locale]) ? trim((string)$item['values'][$locale]) : '';

                // Only updates the key-value pairs that were passed from the client side
                $currentTranslations[$key] = $newValue;
                $hasChanges = true;
            }

            if ($hasChanges) {
                $this->saveToJson($locale, $currentTranslations);
            }
        }

        return back()->with('success', 'Translations updated successfully.');
    }

    /**
     * Check if any locale value is empty or contains only spaces.
     */
    private function hasEmptyValue(array $values): bool
    {
        foreach ($values as $val) {
            if (empty(trim((string) $val))) {
                return true;
            }
        }
        return false;
    }

    /**
     * Sort keys alphabetically and save to a JSON file.
     */
    private function saveToJson(string $locale, array $data): void
    {
        ksort($data);
        $path = "{$this->langPath}/{$locale}.json";
        File::put(
            $path,
            json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }
}
