<?php

namespace App\Repositories;

use App\DTO\CreateCommentData;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;

interface CommentRepositoryInterface
{
    public function createComment(CreateCommentData $data): Comment;
    public function deleteComment(int $id): void;
}