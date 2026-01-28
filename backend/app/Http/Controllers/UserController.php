<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function register(RegisterRequest $request, UserService $userService): JsonResponse
    {
        $response = $userService->register($request->validated());

        return response()->json($response->toArray(), $response->status);
    }

    public function login(LoginRequest $request, UserService $userService): JsonResponse
    {
        $response = $userService->login($request->validated());

        return response()->json($response->toArray(), $response->status);
    }

    public function me(UserService $userService): JsonResponse
    {
        $response = $userService->me();

        return response()->json($response->toArray(), $response->status);
    }
}
