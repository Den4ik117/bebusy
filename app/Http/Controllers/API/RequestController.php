<?php

namespace App\Http\Controllers\API;

use App\Enums\RequestState;
use App\Enums\RequestType;
use App\Http\Controllers\Controller;
use App\Models\Request as RequestModel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RequestController extends Controller
{
    public function index()
    {
        $requests = RequestModel::query()
            ->with(['user'])
            ->latest()
            ->get();

        return response()->json([
            'data' => $requests,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => ['required', 'string', Rule::enum(RequestType::class)],
            'extra' => 'nullable|string|max:4096',
        ]);

        $requestModel = RequestModel::query()->create([
            'uuid' => Str::orderedUuid()->toString(),
            'type' => $request->input('type'),
            'state' => RequestState::New,
            'user_id' => auth()->id(),
            'extra' => $request->input('extra'),
        ]);

        return response()->json([
            'data' => $requestModel,
        ]);
    }

    public function show($uuid)
    {
        $requestModel = RequestModel::query()
            ->with(['user'])
            ->where('uuid', $uuid)
            ->firstOrFail();

        return response()->json([
            'data' => $requestModel,
        ]);
    }

    public function update(Request $request, $uuid)
    {
        $requestModel = RequestModel::query()
            ->where('uuid', $uuid)
            ->firstOrFail();

        $request->validate([
            'state' => ['required', 'string', Rule::enum(RequestState::class)],
        ]);

        $requestModel->update([
            'state' => $request->input('state'),
        ]);

        return response()->json([
            'data' => $requestModel,
        ]);
    }

    public function destroy($uuid)
    {
        $requestModel = RequestModel::query()
            ->where('uuid', $uuid)
            ->firstOrFail();

        $requestModel->delete();

        return response()->noContent();
    }
}
