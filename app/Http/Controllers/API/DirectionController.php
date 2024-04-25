<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Direction;

class DirectionController extends Controller
{
    public function index()
    {
        $directions = Direction::query()->get();

        return response()->json([
            'data' => $directions,
        ]);
    }
}
