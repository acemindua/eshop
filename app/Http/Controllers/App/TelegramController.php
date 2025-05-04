<?php

namespace App\Http\Controllers\App;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TelegramController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render(
            'App/Telegram/Index',
            []
        );
    }
}
