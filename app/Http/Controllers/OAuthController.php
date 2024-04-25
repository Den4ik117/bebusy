<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class OAuthController extends Controller
{
    public function redirect()
    {
        if (app()->isLocal()) {
            $user = User::query()->first();

            Auth::login($user);

            return to_route('index');
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

        abort_if($response->failed(), 500, 'Failed to get token');

        $data = $response->json();

//        $request->user()->hh_token = $data;
        $token = $data['access_token'];

        $response = Http::withToken($token)->get('https://api.hh.ru/me');

        abort_if($response->failed(), 500, 'Failed to get me');

        $me = $response->json();

        dd($me);
    }

    public function logout()
    {
        Auth::logout();

        return to_route('index');
    }
}
