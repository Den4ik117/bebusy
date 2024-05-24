<?php

namespace App\Http\Controllers\API;

use App\Enums\MentorState;
use App\Http\Controllers\Controller;
use App\Models\Mentor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class MentorController extends Controller
{
    public function index()
    {
        $mentors = Mentor::query()
            ->with(['user'])
            ->get();

        return response()->json([
            'data' => $mentors,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id|unique:mentors,user_id',
            'job_title' => 'required|string|max:255',
            'experience' => 'required|string|max:255',
            'price_per_half_hour' => 'required|numeric',
            'price_per_hour' => 'required|numeric',
            'about' => 'required|string|max:4096',
            'directions_ids' => 'required|array',
            'directions_ids.*' => 'required|integer|exists:directions,id',
            'services_ids' => 'required|array',
            'services_ids.*' => 'required|integer|exists:services,id',
            'skills_ids' => 'required|array',
            'skills_ids.*' => 'required|integer|exists:skills,id',
        ]);

        $user = User::query()->find($request->input('user_id'));

        $mentor = Mentor::query()->create([
            'slug' => sprintf('%s-%s-%s', Str::slug($user->last_name), Str::slug($user->first_name), $user->id),
            'user_id' => $request->input('user_id'),
            'job_title' => $request->input('job_title'),
            'experience' => $request->input('experience'),
            'price_per_half_hour' => $request->input('price_per_half_hour'),
            'price_per_hour' => $request->input('price_per_hour'),
            'about' => $request->input('about'),
            'state' => MentorState::Active,
        ]);

        $mentor->directions()->sync($request->input('directions_ids'));
        $mentor->services()->sync($request->input('services_ids'));
        $mentor->skills()->sync($request->input('skills_ids'));

        return response()->json([
            'data' => $mentor,
        ]);
    }

    public function update(Request $request, Mentor $mentor)
    {
        $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id', Rule::unique('mentors', 'user_id')->ignore($mentor->user_id, 'user_id')],
            'job_title' => 'required|string|max:255',
            'experience' => 'required|string|max:255',
            'price_per_half_hour' => 'required|numeric',
            'price_per_hour' => 'required|numeric',
            'about' => 'required|string|max:4096',
        ]);

        $user = User::query()->find($request->input('user_id'));

        $mentor->update([
            'slug' => sprintf('%s-%s-%s', Str::slug($user->last_name), Str::slug($user->first_name), $user->id),
            'user_id' => $request->input('user_id'),
            'job_title' => $request->input('job_title'),
            'experience' => $request->input('experience'),
            'price_per_half_hour' => $request->input('price_per_half_hour'),
            'price_per_hour' => $request->input('price_per_hour'),
            'about' => $request->input('about'),
        ]);

        $mentor->directions()->sync($request->input('directions_ids'));
        $mentor->services()->sync($request->input('services_ids'));
        $mentor->skills()->sync($request->input('skills_ids'));

        return response()->json([
            'data' => $mentor,
        ]);
    }

    public function show($mentor)
    {
        $mentorQuery = is_numeric($mentor)
            ? Mentor::query()->where('id', $mentor)
            : Mentor::query()->where('slug', $mentor);

        $mentor = $mentorQuery->with([
            'directions',
            'services',
            'skills',
            'user',
        ])->firstOrFail();

        return response()->json([
            'data' => $mentor,
        ]);
    }

    public function destroy(Mentor $mentor)
    {
        $mentor->delete();

        return response()->noContent();
    }
}
