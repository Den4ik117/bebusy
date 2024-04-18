<?php

use App\Http\Controllers\API\ChatController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\OAuthController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'index');
Route::view('/_/{uuid}', 'index');

Route::get('/oauth/redirect', [OAuthController::class, 'redirect'])->name('oauth-redirect');
Route::get('/oauth/callback', [OAuthController::class, 'callback'])->name('oauth-callback');

Route::prefix('api')->middleware(['auth'])->group(function () {
    Route::get('/me', [UserController::class, 'show']);

    Route::get('/chats', [ChatController::class, 'index']);
});

Route::get('/test', function () {
    $result = \App\Models\User::query()
        ->with(['chats', 'chats.messages', 'chats.user', 'chats.information'])
        ->find(1);

    dd($result->toArray());
});
