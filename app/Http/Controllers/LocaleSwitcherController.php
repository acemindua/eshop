<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Illuminate\Support\Facades\Log;

class LocaleSwitcherController extends Controller
{
    /**
     * Changes the application locale and redirects the user
     * to the same page but in the new locale.
     *
     * @param string $locale
     * @return \Illuminate\Http\RedirectResponse
     */
    public function change(string $locale)
    {
        $locales = array_keys(LaravelLocalization::getSupportedLocales());
        try {
            if (in_array($locale,  $locales)) {
                app()->setLocale($locale);
                session()->put('locale', $locale);
            } else {
                abort(404);
            }

            $currentUrl = url()->previous();
            $url = LaravelLocalization::getLocalizedURL($locale, $currentUrl);
            return redirect()->to($url);

            // return redirect()->back();
        } catch (\Exception $e) {
            Log::error("LaravelLocalization redirect failed: " . $e->getMessage());
            return redirect('/');
        }
    }
}
