<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'is_not_mentor' => 'nullable|boolean',
        ]);

        $users = User::query()
            ->with(['mentor'])
            ->when($request->boolean('is_not_mentor'), fn($q) => $q->doesntHave('mentor'))
            ->get();

        return response()->json([
            'data' => $users,
        ]);
    }

    public function show(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
        ]);
    }
}
