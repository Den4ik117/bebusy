<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class OAuthController extends Controller
{
    public function redirect()
    {
        if (!app()->isProduction()) {
            $user = User::query()->first();

            Auth::login($user);

            return redirect('/');
        }

        $params = http_build_query([
            'response_type' => 'code',
            'client_id' => config('services.hh.client_id'),
            'redirect_uri' => route('oauth-callback'),
        ]);

        $url = sprintf('https://hh.ru/oauth/authorize?%s', $params);

        return redirect($url);
    }

    public function callback(Request $request)
    {
        $params = http_build_query([
            'client_id' => config('services.hh.client_id'),
            'client_secret' => config('services.hh.client_secret'),
            'code' => $request->input('code'),
            'grant_type' => 'authorization_code',
            'redirect_uri' => route('oauth-callback'),
        ]);

        $response = Http::post(sprintf('https://hh.ru/oauth/token?%s', $params));

        if ($response->ok()) {
            dd($response->json());
        }

        dd($response->json());

        dd($request->all());
    }
}
