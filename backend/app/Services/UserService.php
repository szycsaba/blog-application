<?php

namespace App\Services;

use App\DTO\ServiceResponse;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function __construct(
        private UserRepositoryInterface $repo
    ) {}

    public function register(array $data): ServiceResponse
    {
        try {
            $data['password'] = Hash::make($data['password']);
            $user = $this->repo->createUser($data);
            $resource = $this->userResource($user, false);

            return new ServiceResponse(
                success: true,
                message: 'User registered successfully',
                data: $resource,
                status: 201
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while registering user: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'An error occurred while registering user',
                status: 500
            );
        }
    }

    public function login(array $data): ServiceResponse
    {
        try {
            $user = $this->repo->findByEmail($data['email']);

            if (!$user || !Hash::check($data['password'], $user->password)) {
                return new ServiceResponse(
                    success: false,
                    message: 'Invalid credentials',
                    status: 401
                );
            }

            $user->tokens()->delete();
            $token = $user->createToken('api')->plainTextToken;
            $resource = $this->userResource($user->toArray(), $token);

            return new ServiceResponse(
                success: true,
                message: 'Login successful',
                data: $resource,
                status: 200
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while logging in: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'An error occurred while logging in',
                status: 500
            );
        }
    }

    public function me(): ServiceResponse
    {
        $user = auth()->user();

        return new ServiceResponse(
            success: true,
            data: $this->userResource($user->toArray(), false),
            status: 200
        );
    }

    private function userResource(array $user, string|false $token): array
    {
        return (new UserResource(
            $token === false ? $user : array_merge($user, ['token' => $token])
        ))->toArray(request());
    }
}
