<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnreadMessage extends Model
{
    protected $fillable = [
        'message_id',
        'chat_id',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'read_at' => 'immutable_datetime',
        ];
    }
}
