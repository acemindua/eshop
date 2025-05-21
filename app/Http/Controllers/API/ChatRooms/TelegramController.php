<?php

namespace App\Http\Controllers\API\ChatRooms;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Telegram\Bot\Api;

class TelegramController extends Controller
{

    // Telegram API instance
    protected $telegram;

    // Constructor to initialize the Telegram Bot API with the token from the .env file
    public function __construct()
    {
        $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function webhook(Request $request)
    {
        $data = $request->all();

        if (!isset($data['message']['text'])) {
            return response()->json(['status' => 'no message'], 400);
        }

        $text = $data['message']['text'];
        $telegramUserId = $data['message']['from']['id'];

        // Ти можеш тут створювати user_id динамічно або хардкодити для тесту
        $message = Message::create([
            'user_id' => $telegramUserId, // або знайди user_id по telegramUserId
            'text' => $text,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['status' => 'ok']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $chatId = '1145581773'; // Replace with your chat ID


        $message = Message::create([
            'user_id' => $request->user_id,
            'text' => $request->message,
        ]);

        broadcast(new MessageSent($message));

        /* $message = 'Hello, this is a message from Laravel!'; */

        $this->telegram->sendMessage([
            'chat_id' => $chatId,
            'text' => $request->message,
        ]);

        return 'Message sent to Telegram!';
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
