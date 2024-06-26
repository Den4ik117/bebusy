<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Chat extends Model
{
    protected $fillable = [
        'chat_id',
        'owner_id',
        'user_id',
    ];

    public function information(): BelongsTo
    {
        return $this->belongsTo(ChatInformation::class, 'chat_id', 'id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'chat_id', 'chat_id');
    }

    public function latestMessage(): HasOne
    {
        return $this->messages()
            ->latest()
            ->one();
    }

    public function unreadMessages(): HasMany
    {
        return $this->hasMany(UnreadMessage::class, 'chat_id', 'id')->whereNull('read_at');
    }
}
