<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'chat_id',
        'user_id',
    ];

    protected $appends = [
        'human_created_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function humanCreatedAt(): Attribute
    {
        return new Attribute(
            get: function () {
                if (now()->subDay()->lessThan($this->created_at)) {
                    return $this->created_at->format('H:i');
                } else if (now()->subDay()->greaterThanOrEqualTo($this->created_at) && now()->subWeek()->lessThan($this->created_at)) {
                    return $this->created_at->translatedFormat('D');
                }

                return $this->created_at->format('d.m.Y');
            },
        );
    }
}
