<?php

use App\Http\Controllers\API as API;
use App\Http\Controllers\OAuthController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'index');
Route::view('/_/{uuid}', 'index');
Route::view('/admin', 'index');
Route::view('/admin/{all}', 'index')->where('all', '.*');

Route::get('/oauth/redirect', [OAuthController::class, 'redirect'])->name('oauth-redirect');
Route::get('/oauth/callback', [OAuthController::class, 'callback'])->name('oauth-callback');

Route::prefix('api')->middleware(['auth'])->group(function () {
    Route::get('/me', [API\UserController::class, 'show']);

    Route::get('/chats', [API\ChatController::class, 'index']);

    Route::get('/users', [API\UserController::class, 'index']);

    Route::post('/messages', [API\MessageController::class, 'store']);

    Route::middleware(['role:admin'])->group(function () {
        Route::get('/mentors', [API\MentorController::class, 'index']);
        Route::post('/mentors', [API\MentorController::class, 'store']);
        Route::get('/mentors/{mentor}', [API\MentorController::class, 'show']);
        Route::put('/mentors/{mentor}', [API\MentorController::class, 'update']);
        Route::delete('/mentors/{mentor}', [API\MentorController::class, 'destroy']);

        Route::get('/directions', [API\DirectionController::class, 'index']);

        Route::get('/services', [API\ServiceController::class, 'index']);

        Route::get('/skills', [API\SkillController::class, 'index']);

        Route::get('/interviews', [API\InterviewController::class, 'index']);
        Route::post('/interviews', [API\InterviewController::class, 'store']);
        Route::get('/interviews/{interview}', [API\InterviewController::class, 'show']);
        Route::put('/interviews/{interview}', [API\InterviewController::class, 'update']);
        Route::delete('/interviews/{interview}', [API\InterviewController::class, 'destroy']);

        Route::get('/grades', [API\GradeController::class, 'index']);

        Route::get('/questions', [API\QuestionController::class, 'index']);
        Route::post('/questions', [API\QuestionController::class, 'store']);
        Route::get('/questions/{question}', [API\QuestionController::class, 'show']);
        Route::put('/questions/{question}', [API\QuestionController::class, 'update']);
        Route::delete('/questions/{question}', [API\QuestionController::class, 'destroy']);

        Route::get('/tags', [API\TagController::class, 'index']);

        Route::get('/development-directions', [API\DevelopmentDirectionController::class, 'index']);

        Route::get('/requirements', [API\RequirementController::class, 'index']);
        Route::post('/requirements', [API\RequirementController::class, 'store']);
        Route::get('/requirements/{requirement}', [API\RequirementController::class, 'show']);
        Route::put('/requirements/{requirement}', [API\RequirementController::class, 'update']);
        Route::delete('/requirements/{requirement}', [API\RequirementController::class, 'destroy']);
    });
});

Route::get('/test', function () {
    $result = \App\Models\User::query()
        ->with(['chats', 'chats.messages', 'chats.user', 'chats.information'])
        ->find(1);

    dd($result->toArray());
});
