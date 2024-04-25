<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'uuid',
        'external_id',
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'telegram',
        'github',
        'role',
        'password',
        'last_visit_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'full_name',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'role' => UserRole::class,
            'email_verified_at' => 'datetime',
            'last_visit_at' => 'immutable_datetime',
            'password' => 'hashed',
        ];
    }

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class, 'owner_id', 'id');
    }

    public function fullName(): Attribute
    {
        return new Attribute(
            get: fn() => sprintf('%s %s', $this->last_name, $this->first_name),
        );
    }

    public function hasChatWith(User|int $user): bool
    {
        $userId = $user instanceof User ? $user->id : $user;

        $numberOfChats = Chat::query()
            ->where(fn($q) => $q->where('owner_id', $this->id)->where('user_id', $userId))
            ->orWhere(fn($q) => $q->where('owner_id', $userId)->where('user_id', $this->id))
            ->count();

        return $numberOfChats >= 2;
    }

    public function mentor(): HasOne
    {
        return $this->hasOne(Mentor::class);
    }

    public function hhToken(): Attribute
    {
        return new Attribute(
            get: fn() => Cache::get(sprintf('hh-token-%s', $this->id)),
            set: fn($data) => Cache::set(sprintf('hh-token-%s', $this->id), $data['access_token'], $data['expires_in']),
        );
    }
}
