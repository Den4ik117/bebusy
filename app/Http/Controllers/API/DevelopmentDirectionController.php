<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\DevelopmentDirection;

class DevelopmentDirectionController extends Controller
{
    public function index()
    {
        $developmentDirections = DevelopmentDirection::query()->get();

        return response()->json([
            'data' => $developmentDirections,
        ]);
    }
}
