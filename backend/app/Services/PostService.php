<?php

namespace App\Services;

use App\DTO\ServiceResponse;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostWithCommentsResource;
use App\Repositories\PostRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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

            return new ServiceResponse(
                success: true,
                message: 'Posts listed successfully',
                data: PostResource::collection($posts)->toArray(request()),
                status: 200
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while fetching posts: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'An error occurred while fetching posts',
                status: 500
            );
        }
    }

    public function showPost(int $id): ServiceResponse
    {
        try {
            $post = $this->repo->showPost($id);

            return new ServiceResponse(
                success: true,
                message: 'Post listed successfully',
                data: (new PostWithCommentsResource($post))->toArray(request()),
                status: 200
            );
        } catch (ModelNotFoundException $e) {
            Log::error('Post not found: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'Post not found',
                status: 404
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while fetching post: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'An error occurred while fetching post',
                status: 500
            );
        }
    }

    public function createPost(array $params): ServiceResponse
    {
        try {
            $user = Auth::user();

            $params['user_id'] = $user->id;
            $post = $this->repo->createPost($params);

            return new ServiceResponse(
                success: true,
                message: 'Post created successfully',
                data: (new PostResource($post))->toArray(request()),
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

    public function updatePost(array $params): ServiceResponse 
    {
        try {
            $post = $this->repo->updatePost($params);

            return new ServiceResponse(
                success: true,
                message: 'Post updated successfully',
                data: (new PostResource($post))->toArray(request()),
                status: 200
            );
        } catch (ModelNotFoundException $e) {
            Log::error('Post not found: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'Post not found',
                status: 404
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while updating post: ' . $e->getMessage());
            return new ServiceResponse(
                success: false,
                message: 'An error occurred while updating post',
                status: 500
            );
        }
    }

    public function deletePost(int $id): ServiceResponse
    {
        try {
            $this->repo->deletePost($id);

            return new ServiceResponse(
                success: true,
                message: 'Post deleted successfully',
                data: [],
                status: 200
            );
        } catch (ModelNotFoundException $e) {
            Log::error('Post not found: ' . $e->getMessage());

            return new ServiceResponse(
                success: false,
                message: 'Post not found',
                status: 404
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while deleting post: ' . $e->getMessage());

            return new ServiceResponse(
                success: false,
                message: 'An error occurred while deleting post',
                status: 500
            );
        }
    }
}