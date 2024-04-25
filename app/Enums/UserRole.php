<?php

namespace App\Enums;

enum UserRole: string
{
    case Bot = 'BOT';
    case User = 'USER';
    case Admin = 'ADMIN';
}
