<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Interview;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class InterviewController extends Controller
{
    public function index()
    {
        $interviews = Interview::query()->get();

        return response()->json([
            'data' => $interviews,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'url' => ['required', 'string', 'url', 'max:255', Rule::unique('interviews', 'url')],
            'direction_id' => 'required|integer|exists:directions,id',
            'grade_id' => 'required|integer|exists:grades,id',
        ]);

        $interview = Interview::query()->create([
            'title' => $request->input('title'),
            'url' => $request->input('url'),
            'direction_id' => $request->input('direction_id'),
            'grade_id' => $request->input('grade_id'),
        ]);

        return response()->json([
            'data' => $interview,
        ]);
    }

    public function update(Request $request, Interview $interview)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'url' => ['required', 'string', 'url', 'max:255', Rule::unique('interviews', 'url')->ignoreModel($interview)],
            'direction_id' => 'required|integer|exists:directions,id',
            'grade_id' => 'required|integer|exists:grades,id',
        ]);

        $interview->update([
            'title' => $request->input('title'),
            'url' => $request->input('url'),
            'direction_id' => $request->input('direction_id'),
            'grade_id' => $request->input('grade_id'),
        ]);

        return response()->json([
            'data' => $interview,
        ]);
    }

    public function show(Interview $interview)
    {
        return response()->json([
            'data' => $interview,
        ]);
    }

    public function destroy(Interview $interview)
    {
        $interview->delete();

        return response()->noContent();
    }
}
