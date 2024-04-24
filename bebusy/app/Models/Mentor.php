<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mentor extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'user_id',
        'job_title',
        'experience',
        'price_per_half_hour',
        'price_per_hour',
        'about',
    ];

    protected function casts(): array
    {
        return [
            'price_per_half_hour' => 'integer',
            'price_per_hour' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function directions(): BelongsToMany
    {
        return $this->belongsToMany(Direction::class, 'mentor_direction', 'mentor_id', 'direction_id');
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'mentor_service', 'mentor_id', 'service_id');
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'mentor_skill', 'mentor_id', 'skill_id');
    }
}
