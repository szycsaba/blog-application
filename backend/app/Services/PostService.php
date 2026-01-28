<?php

namespace App\Services;

use App\DTO\ServiceResponse;
use App\Http\Resources\PostResource;
use App\Repositories\PostRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;

class PostService
{
    public function __construct(
        private PostRepositoryInterface $repo
    ) {}

    public function getPosts(): ServiceResponse
    {
        try {
            $posts = $this->repo->getPosts();

            $resource = PostResource::collection($posts)->toArray(request());

            return new ServiceResponse(
                success: true,
                message: 'Posts listed successfully',
                data: $resource,
                status: 200
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while fetching posts: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'An error occurred while fetching books',
                status: 500
            );
        }
    }
}