<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    protected $fillable = [
        'title',
        'url',
        'direction_id',
        'grade_id',
    ];
}
