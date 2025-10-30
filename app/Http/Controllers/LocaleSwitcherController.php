<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Illuminate\Support\Facades\Log;

class LocaleSwitcherController extends Controller
{
    /**
     * Changes the application locale and redirects the user.
     * The redirection is simplified to the localized home page to avoid dynamic route resolution issues.
     *
     * @param string $locale The locale code to switch to (e.g., 'en', 'fr').
     * @return \Illuminate\Http\RedirectResponse
     */
    public function change(string $locale)
    {

        app()->setLocale($locale);
        session()->put('locale', $locale);
        try {
            $url = LaravelLocalization::getLocalizedURL($locale, '/');
            return redirect()->to($url);
        } catch (\Exception $e) {
            Log::error("LaravelLocalization redirect failed: " . $e->getMessage());
            return redirect('/');
        }
    }
}
