<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::query()->get();

        return response()->json([
            'data' => $services,
        ]);
    }
}
