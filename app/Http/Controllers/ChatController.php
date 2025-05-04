<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render(
            'App/Chats/Index',
            []
        );
    }

    public function postMessage(Request $request, $roomId)
    {
        $userName = 'Anonym';
        $messageContent = $request->input('message');
        MessageSent::dispatch($userName, $roomId, $messageContent);
        return response()->json(['status' => 'Message sent successfully.']);
    }
}
