<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Grade;

class GradeController extends Controller
{
    public function index()
    {
        $grades = Grade::query()->get();

        return response()->json([
            'data' => $grades,
        ]);
    }
}
