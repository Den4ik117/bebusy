<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::query()->get();

        return response()->json([
            'data' => $tags,
        ]);
    }
}
