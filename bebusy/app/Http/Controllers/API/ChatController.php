<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $user->load(['chats', 'chats.messages', 'chats.user', 'chats.information']);

        return response()->json([
            'data' => $user->chats,
        ]);
    }
}
