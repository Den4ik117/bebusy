<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
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

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
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
}
