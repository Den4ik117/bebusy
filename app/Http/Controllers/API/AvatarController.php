<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image',
        ]);

        $path = $request->file('file')->store('public/avatars');
        $path = str_replace('public', '/storage', $path);

        return response()->json([
            'data' => [
                'url' => $path,
            ],
        ]);
    }
}
