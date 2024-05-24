<?php

namespace Database\Factories;

use App\Enums\ChatType;
use App\Models\Chat;
use App\Models\ChatInformation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<ChatInformation> */
class ChatInformationFactory extends Factory
{
    const CHAR_TYPE_CASES = [
        ChatType::Private,
        ChatType::Private,
        ChatType::Group,
        ChatType::Private,
        ChatType::Private,
    ];

    public function definition(): array
    {
        $type = fake()->randomElement(self::CHAR_TYPE_CASES);

        return [
            'uuid' => Str::orderedUuid()->toString(),
            'name' => $this->getName($type),
            'type' => $type,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (ChatInformation $information) {
            match ($information->type) {
                ChatType::Private => $this->afterCreatingPrivateChat($information),
                ChatType::Group => $this->afterCreatingGroupChat($information),
            };
        });
    }

    private function getName(ChatType $type): ?string
    {
        return match ($type) {
            ChatType::Group => sprintf('Групповой чат №%s', fake()->numerify('#####')),
            default => null,
        };
    }

    private function afterCreatingPrivateChat(ChatInformation $information): void
    {
        $users = User::query()->get(['id', 'first_name', 'last_name'])->random(2)->all();
        $indexes = [[0, 1], [1, 0]];

        foreach ($indexes as $index) {
            $firstUser = $users[$index[0]];
            $secondUser = $users[$index[1]];

            if ($firstUser->hasChatWith($secondUser)) continue;

            $chat = Chat::query()->create([
                'chat_id' => $information->id,
                'owner_id' => $firstUser->id,
                'user_id' => $secondUser->id,
            ]);

            Message::factory(5)->create([
                'chat_id' => $chat->chat_id,
                'user_id' => $firstUser->id,
            ]);
        }
    }

    private function afterCreatingGroupChat(ChatInformation $information): void
    {
        $users = User::query()->take(fake()->numberBetween(0, User::query()->count()))->get();

        foreach ($users as $user) {
            $chat = Chat::query()->create([
                'chat_id' => $information->id,
                'owner_id' => $user->id,
            ]);

            Message::factory(5)->create([
                'chat_id' => $chat->chat_id,
                'user_id' => $user->id,
            ]);
        }
    }
}
