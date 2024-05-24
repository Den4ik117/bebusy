<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Message;
use App\Models\UnreadMessage;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:4096',
            'chat_id' => 'required|integer|exists:chat_information,id',
        ]);

        $message = Message::query()->create([
            'content' => $request->input('content'),
            'chat_id' => $request->input('chat_id'),
            'user_id' => $request->user()->id,
        ]);

        $message->load(['chat', 'chat.chats']);

        $message->chat->chats->each(function (Chat $chat) use ($request, $message) {
            UnreadMessage::query()->create([
                'message_id' => $message->id,
                'chat_id' => $chat->id,
                'read_at' => $request->user()->id === $chat->owner_id ? now() : null,
            ]);
        });

//        $message = Message::query()
//            ->with(['user'])
//            ->find($message->id);

        MessageSent::dispatch();

        return response()->json([
            'data' => $message,
        ]);
    }
}
