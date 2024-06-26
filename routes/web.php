<?php

use App\Http\Controllers\API as API;
use App\Http\Controllers\OAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/oauth/redirect', [OAuthController::class, 'redirect'])->name('oauth-redirect');
Route::get('/oauth/callback', [OAuthController::class, 'callback'])->name('oauth-callback');
Route::get('/logout', [OAuthController::class, 'logout'])->name('logout');

Route::prefix('api')->middleware(['auth'])->group(function () {
    Route::get('/me', [API\UserController::class, 'getMe']);
    Route::patch('/me', [API\UserController::class, 'updateMe']);

    Route::get('/chats', [API\ChatController::class, 'index']);
    Route::post('/chats', [API\ChatController::class, 'store']);
    Route::get('/chats/{chat:uuid}', [API\ChatController::class, 'show']);

    Route::get('/users', [API\UserController::class, 'index']);

    Route::post('/messages', [API\MessageController::class, 'store']);

    Route::post('/requests', [API\RequestController::class, 'store']);

    Route::withoutMiddleware(['auth'])->group(function () {
        Route::get('/mentors', [API\MentorController::class, 'index']);
        Route::get('/mentors/{mentor}', [API\MentorController::class, 'show']);
        Route::get('/interviews', [API\InterviewController::class, 'index']);
        Route::get('/questions', [API\QuestionController::class, 'index']);
        Route::get('/requirements', [API\RequirementController::class, 'index']);
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::post('/mentors', [API\MentorController::class, 'store']);
        Route::put('/mentors/{mentor}', [API\MentorController::class, 'update']);
        Route::delete('/mentors/{mentor}', [API\MentorController::class, 'destroy']);

        Route::get('/directions', [API\DirectionController::class, 'index']);

        Route::get('/services', [API\ServiceController::class, 'index']);

        Route::get('/skills', [API\SkillController::class, 'index']);

        Route::post('/interviews', [API\InterviewController::class, 'store']);
        Route::get('/interviews/{interview}', [API\InterviewController::class, 'show']);
        Route::put('/interviews/{interview}', [API\InterviewController::class, 'update']);
        Route::delete('/interviews/{interview}', [API\InterviewController::class, 'destroy']);

        Route::get('/grades', [API\GradeController::class, 'index']);

        Route::post('/questions', [API\QuestionController::class, 'store']);
        Route::get('/questions/{question}', [API\QuestionController::class, 'show']);
        Route::put('/questions/{question}', [API\QuestionController::class, 'update']);
        Route::delete('/questions/{question}', [API\QuestionController::class, 'destroy']);

        Route::get('/tags', [API\TagController::class, 'index']);

        Route::get('/development-directions', [API\DevelopmentDirectionController::class, 'index']);

        Route::post('/requirements', [API\RequirementController::class, 'store']);
        Route::get('/requirements/{requirement}', [API\RequirementController::class, 'show']);
        Route::put('/requirements/{requirement}', [API\RequirementController::class, 'update']);
        Route::delete('/requirements/{requirement}', [API\RequirementController::class, 'destroy']);

        Route::post('/users', [API\UserController::class, 'store']);
        Route::get('/users/{user}', [API\UserController::class, 'show']);
        Route::put('/users/{user}', [API\UserController::class, 'update']);
        Route::delete('/users/{user}', [API\UserController::class, 'destroy']);

        Route::post('/avatars', [API\AvatarController::class, 'store']);

        Route::get('/requests', [API\RequestController::class, 'index']);
        Route::get('/requests/{uuid}', [API\RequestController::class, 'show']);
        Route::patch('/requests/{uuid}', [API\RequestController::class, 'update']);
        Route::delete('/requests/{uuid}', [API\RequestController::class, 'destroy']);

        Route::get('/dashboard', [API\DashboardController::class, 'index']);
    });
});

Route::view('{all}', 'index')->where('all', '.*');
