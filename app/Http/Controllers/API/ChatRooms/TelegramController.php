<?php

namespace App\Http\Controllers\API\ChatRooms;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        $update = $request->all();

        // лог для перевірки
        Log::info('Telegram webhook', $update);

        // перевірка чи є повідомлення
        if (isset($update['message'])) {
            $messageData = $update['message'];

            $chatId = $messageData['chat']['id'];
            $text = $messageData['text'] ?? '';
            $username = $messageData['from']['username'] ?? 'Unknown';

            // Зберігаємо в базу (опціонально створити користувача по chatId)
            $message = Message::create([
                'user_id' => 9999, // або знайди user_id по chatId
                'text' => $text,
            ]);

            // Трансляція через Pusher
            broadcast(new MessageSent($message));

            // Відповідь користувачеві
            $this->telegram->sendMessage([
                'chat_id' => $chatId,
                'text' => "Привіт, @$username! Ви написали: \"$text\"",
            ]);
        }

        return response()->json(['status' => 'received']);
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
