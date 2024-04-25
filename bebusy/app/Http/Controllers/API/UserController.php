<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'is_not_mentor' => 'nullable|boolean',
            'except_me' => 'nullable|boolean',
        ]);

        $users = User::query()
            ->with(['mentor'])
            ->when($request->boolean('is_not_mentor'), fn($q) => $q->doesntHave('mentor'))
            ->when($request->boolean('except_me'), fn($q) => $q->where('id', '!=', $request->user()->id))
            ->get();

        return response()->json([
            'data' => $users,
        ]);
    }

    public function updateMe(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'telegram' => 'nullable|string|url|max:255',
            'github' => 'nullable|string|url|max:255',
        ]);

        $request->user()->update([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'middle_name' => $request->input('middle_name'),
            'telegram' => $request->input('telegram'),
            'github' => $request->input('github'),
        ]);

        return response()->json([
            'data' => $request->user(),
        ]);
    }

    public function getMe(Request $request)
    {
        $request->user()->update([
            'last_visit_at' => now(),
        ]);

        return response()->json([
            'data' => $request->user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'telegram' => 'nullable|string|url|max:255',
            'github' => 'nullable|string|url|max:255',
            'role' => ['required', 'string', Rule::enum(UserRole::class)],
        ]);

        $user = User::query()->create([
            'uuid' => Str::orderedUuid()->toString(),
            'first_name' => $request->input('first_name'),
            'middle_name' => $request->input('middle_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'telegram' => $request->input('telegram'),
            'github' => $request->input('github'),
            'role' => $request->input('role'),
        ]);

        event(new Registered($user));

        return response()->json([
            'data' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignoreModel($user)],
            'telegram' => 'nullable|string|url|max:255',
            'github' => 'nullable|string|url|max:255',
            'role' => ['required', 'string', Rule::enum(UserRole::class)],
        ]);

        $user->update([
            'first_name' => $request->input('first_name'),
            'middle_name' => $request->input('middle_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'telegram' => $request->input('telegram'),
            'github' => $request->input('github'),
            'role' => $request->input('role'),
        ]);

        return response()->json([
            'data' => $user,
        ]);
    }

    public function show(User $user)
    {
        return response()->json([
            'data' => $user,
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
