<?php

namespace App\Models;

use App\Enums\RequestState;
use App\Enums\RequestType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Request extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'type',
        'state',
        'user_id',
        'extra',
    ];

    protected function casts(): array
    {
        return [
            'type' => RequestType::class,
            'state' => RequestState::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
