<?php

namespace App\Enums;

enum MentorState: string
{
    case Active = 'ACTIVE';
    case Inactive = 'INACTIVE';
    case Pending = 'PENDING';
    case Rejected = 'REJECTED';
}
