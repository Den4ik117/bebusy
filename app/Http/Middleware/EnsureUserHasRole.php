<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if ($request->user()->role !== UserRole::from(strtoupper($role))) {
            abort(403);
        }

        return $next($request);
    }
}
