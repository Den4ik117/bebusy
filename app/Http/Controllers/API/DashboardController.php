<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Interview;
use App\Models\Mentor;
use App\Models\Message;
use App\Models\Question;
use App\Models\Request;
use App\Models\Requirement;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => [
                'users_count' => User::query()->count(),
                'mentors_count' => Mentor::query()->count(),
                'requests_count' => Request::query()->count(),
                'interviews_count' => Interview::query()->count(),
                'requirements_count' => Requirement::query()->count(),
                'questions_count' => Question::query()->count(),
                'messages_count' => Message::query()->count(),
                'chats_count' => Chat::query()->count(),
            ],
        ]);
    }
}
