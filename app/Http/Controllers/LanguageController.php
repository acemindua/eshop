<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class LanguageController extends Controller
{
    /**
     * Change the application's current language and redirect to the previous page.
     *
     * @param string $locale Language code to switch to (e.g. 'en', 'uk')
     * @return \Illuminate\Http\RedirectResponse
     */
    public function change(string $locale)
    {
        // Ensure the requested locale is supported
        if (!array_key_exists($locale, LaravelLocalization::getSupportedLocales())) {
            abort(404);
        }

        // Set locale in the session and app
        session()->put('locale', $locale);
        app()->setLocale($locale);

        // Extract the path from the previous URL
        $previousUrl = url()->previous();
        $path = parse_url($previousUrl, PHP_URL_PATH) ?? '/';

        // Generate a localized URL based on the new locale
        $localizedUrl = LaravelLocalization::getLocalizedURL($locale, $path);

        return Redirect::to($localizedUrl);
    }
}
