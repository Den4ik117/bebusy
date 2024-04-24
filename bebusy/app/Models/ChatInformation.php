<?php

namespace App\Models;

use App\Enums\ChatType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
