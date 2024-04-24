<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Requirement;
use Illuminate\Http\Request;

class RequirementController extends Controller
{
    public function index()
    {
        $requirements = Requirement::query()
            ->with(['skill', 'direction'])
            ->get();

        return response()->json([
            'data' => $requirements,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'skill_id' => 'required|integer|exists:skills,id',
            'direction_id' => 'required|integer|exists:directions,id',
            'mentions' => 'required|integer|min:0',
        ]);

        $requirement = Requirement::query()->create([
            'skill_id' => $request->input('skill_id'),
            'direction_id' => $request->input('direction_id'),
            'mentions' => $request->input('mentions'),
        ]);

        return response()->json([
            'data' => $requirement,
        ]);
    }

    public function update(Request $request, Requirement $requirement)
    {
        $request->validate([
            'skill_id' => 'required|integer|exists:skills,id',
            'direction_id' => 'required|integer|exists:directions,id',
            'mentions' => 'required|integer|min:0',
        ]);

        $requirement->update([
            'skill_id' => $request->input('skill_id'),
            'direction_id' => $request->input('direction_id'),
            'mentions' => $request->input('mentions'),
        ]);

        return response()->json([
            'data' => $requirement,
        ]);
    }

    public function show(Requirement $requirement)
    {
        return response()->json([
            'data' => $requirement,
        ]);
    }

    public function destroy(Requirement $requirement)
    {
        $requirement->delete();

        return response()->noContent();
    }
}
