<?php

namespace App\Enums;

enum RequestState: string
{
    case New = 'NEW';
    case Reviewed = 'REVIEWED';
}
