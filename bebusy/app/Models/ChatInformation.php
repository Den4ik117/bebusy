<?php

namespace App\Models;

use App\Enums\ChatType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ChatInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'type' => ChatType::class,
        ];
    }

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class, 'chat_id', 'id');
    }
}
