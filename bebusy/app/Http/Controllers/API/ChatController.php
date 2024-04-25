<?php

namespace App\Http\Controllers\API;

use App\Enums\ChatType;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\ChatInformation;
use App\Models\Message;
use App\Models\UnreadMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $chats = Chat::query()
            ->with([
                'messages',
                'messages.user',
                'user',
                'information',
                'latestMessage',
                'latestMessage.user',
            ])
            ->withCount([
                'unreadMessages',
            ])
            ->where('owner_id', $request->user()->id)
            ->get()
            ->sortByDesc(fn($chat) => $chat->latestMessage?->created_at->timestamp)
            ->values();

        return response()->json([
            'data' => $chats,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'is_group' => 'required|boolean',
            'name' => 'required_if_accepted:is_group|string|max:255',
            'user_id' => [Rule::requiredIf(fn() => $request->boolean('is_group') === false), 'integer', 'exists:users,id'],
            'user_ids' => 'required_if_accepted:is_group|array',
            'user_ids.*' => 'required|integer|exists:users,id',
        ]);

        if ($request->boolean('is_group')) {
            $usersIds = $request->collect('user_ids');
            $usersIds->push($request->user()->id);
            $usersIds = $usersIds->unique();

            $information = ChatInformation::query()->create([
                'uuid' => Str::orderedUuid()->toString(),
                'name' => $request->input('name'),
                'type' => ChatType::Group,
            ]);

            $chats = [];

            foreach ($usersIds as $userId) {
                $chats[] = Chat::query()->create([
                    'chat_id' => $information->id,
                    'owner_id' => $userId,
                ]);
            }

            $message = Message::query()->create([
                'content' => 'Групповой чат создан',
                'chat_id' => $information->id,
            ]);

            foreach ($chats as $chat) {
                UnreadMessage::query()->create([
                    'chat_id' => $chat->id,
                    'message_id' => $message->id,
                ]);
            }

            return response()->json([
                'data' => $information,
            ]);
        }

        $user = User::query()->find($request->input('user_id'));

        if ($request->user()->hasChatWith($user)) {
            $chat = Chat::query()
                ->with(['information'])
                ->where(fn($q) => $q->where('owner_id', $request->user()->id)->where('user_id', $user->id))
                ->orWhere(fn($q) => $q->where('owner_id', $user->id)->where('user_id', $request->user()->id))
                ->first();

            return response()->json([
                'data' => $chat->information,
            ]);
        }

        $information = ChatInformation::query()->create([
            'uuid' => Str::orderedUuid()->toString(),
            'type' => ChatType::Private,
        ]);

        Chat::query()->create([
            'chat_id' => $information->id,
            'owner_id' => $request->user()->id,
            'user_id' => $user->id,
        ]);

        $chat = Chat::query()->create([
            'chat_id' => $information->id,
            'owner_id' => $user->id,
            'user_id' => $request->user()->id,
        ]);

        $message = Message::query()->create([
            'content' => 'Чат создан',
            'chat_id' => $information->id,
        ]);

        UnreadMessage::query()->create([
            'chat_id' => $chat->id,
            'message_id' => $message->id,
        ]);

        return response()->json([
            'data' => $information,
        ]);
    }

    public function show(Request $request, $chat)
    {
        $chat = ChatInformation::query()
            ->where('uuid', $chat)
            ->firstOrFail()
            ->chats()
            ->where('owner_id', $request->user()->id)
            ->firstOrFail();

        UnreadMessage::query()
            ->where('chat_id', $chat->id)
            ->update([
                'read_at' => now(),
            ]);

        $chat->load([
            'messages',
            'messages.user',
            'user',
            'information',
            'latestMessage',
            'latestMessage.user',
        ]);

        return response()->json([
            'data' => $chat,
        ]);
    }
}
