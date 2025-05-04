<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class LanguageController extends Controller
{
    //
    public function change($locale)
    {
        app()->setLocale($locale);
        session()->put('locale', $locale);

        $segments = str_replace(url('/'), '', url()->previous());
        $url = LaravelLocalization::getLocalizedURL($locale, $segments);

        return redirect()->to($url);
    }
}
