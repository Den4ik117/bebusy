<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    $result = \App\Models\User::query()
        ->with(['chats', 'chats.messages', 'chats.user', 'chats.information'])
        ->find(1);

    dd($result->toArray());
});
