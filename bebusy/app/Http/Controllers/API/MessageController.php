<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Message;
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

        $message->load(['user']);

        MessageSent::dispatch($message);

        return response()->json([
            'data' => $message,
        ]);
    }
}
