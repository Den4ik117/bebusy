<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Resume;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
    public function redirect()
    {
        if (app()->isLocal()) {
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

        abort_if($response->failed(), 500, 'Failed to get token');

        $tokens = $response->json();

        $token = $tokens['access_token'];

        $response = Http::withToken($token)->get('https://api.hh.ru/me');

        abort_if($response->failed(), 500, 'Failed to get me');

        $me = $response->json();

        $user = User::query()->where('external_id', $me['id'])->first();

        if (!$user) {
            $user = User::query()->create([
                'uuid' => Str::orderedUuid()->toString(),
                'external_id' => $me['id'],
                'first_name' => $me['first_name'],
                'middle_name' => $me['middle_name'],
                'last_name' => $me['last_name'],
                'email' => $me['email'],
                'role' => UserRole::Admin,
                'data' => $me,
            ]);

            $response = Http::withToken($token)->get('https://api.hh.ru/resumes/mine');

            abort_if($response->failed(), 500, 'Failed to get my resumes');

            $resumes = Arr::get($response->json(), 'items', []);

            foreach ($resumes as $resume) {
                $response = Http::withToken($token)->get("https://api.hh.ru/resumes/{$resume['id']}");

                abort_if($response->failed(), 500, 'Failed to get resume');

                Resume::query()->create([
                    'uuid' => Str::orderedUuid()->toString(),
                    'user_id' => $user->id,
                    'data' => $response->json(),
                ]);
            }
        } else {
            $user->update([
                'data' => $me,
            ]);
        }

        $user->hh_token = $tokens;

        Auth::login($user);

        return redirect('/');
    }

    public function logout()
    {
        Auth::logout();

        return redirect('/');
    }
}
