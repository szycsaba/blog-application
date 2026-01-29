<?php

namespace App\Services;

use App\DTO\CreateCommentData;
use App\DTO\ServiceResponse;
use App\Http\Resources\CommentResource;
use App\Repositories\CommentRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CommentService
{
    public function __construct(
        private readonly CommentRepositoryInterface $repo
    ) {}

    public function createComment(array $params): ServiceResponse
    {
        try {
            $params['user_id'] = auth('sanctum')->id();

            $data = new CreateCommentData(
                postId: $params['post_id'],
                userId: $params['user_id'],
                comment: $params['comment'],
            );

            $comment = $this->repo->createComment($data);

            return new ServiceResponse(
                success: true,
                message: 'Comment created successfully',
                data: (new CommentResource($comment))->toArray(request()),
                status: 201
            );
        } catch (QueryException $e) {
            Log::error('An error occurred while creating comment: ' . $e->getMessage());

            return new ServiceResponse(
                success: false,
                message: 'An error occurred while creating comment',
                status: 500
            );
        }
    }
}
