<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::query()->get();

        return response()->json([
            'data' => $questions,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:4096',
            'development_direction_id' => 'required|integer|exists:development_directions,id',
            'tag_id' => 'nullable|integer|exists:tags,id',
        ]);

        $question = Question::query()->create([
            'question' => $request->input('question'),
            'answer' => $request->input('answer'),
            'development_direction_id' => $request->input('development_direction_id'),
            'tag_id' => $request->input('tag_id'),
        ]);

        return response()->json([
            'data' => $question,
        ]);
    }

    public function update(Request $request, Question $question)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:4096',
            'development_direction_id' => 'required|integer|exists:development_directions,id',
            'tag_id' => 'nullable|integer|exists:tags,id',
        ]);

        $question->update([
            'question' => $request->input('question'),
            'answer' => $request->input('answer'),
            'development_direction_id' => $request->input('development_direction_id'),
            'tag_id' => $request->input('tag_id'),
        ]);

        return response()->json([
            'data' => $question,
        ]);
    }

    public function show(Question $question)
    {
        return response()->json([
            'data' => $question,
        ]);
    }

    public function destroy(Question $question)
    {
        $question->delete();

        return response()->noContent();
    }
}
