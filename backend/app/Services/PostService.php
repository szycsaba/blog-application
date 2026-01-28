<?php

namespace App\Services;

use App\DTO\ServiceResponse;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostWithCommentsResource;
use App\Repositories\PostRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

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

    public function showPost(int $id): ServiceResponse
    {
        try {
            $post = $this->repo->showPost($id);
            $resource = (new PostWithCommentsResource($post))->toArray(request());

            return new ServiceResponse(
                success: true,
                message: 'Post listed successfully',
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

    public function createPost(array $data): ServiceResponse
    {
        try {
            $user = Auth::user();

            $data['user_id'] = $user->id;
            $post = $this->repo->createPost($data);
            $post['user'] = [
                'id' => $user->id,
                'name' => $user->name,
            ];
            $resource = (new PostResource($post))->toArray(request());

            return new ServiceResponse(
                success: true,
                message: 'Post created successfully',
                data: $resource,
                status: 201
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while creating post: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'An error occurred while creating post',
                status: 500
            );
        }
    }
}