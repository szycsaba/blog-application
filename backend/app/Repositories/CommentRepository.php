<?php

namespace App\Repositories;

use App\DTO\CreateCommentData;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;

class CommentRepository implements CommentRepositoryInterface
{
  public function createComment(CreateCommentData $data): Comment
  {
    $comment = new Comment();
    $comment->post_id = $data->postId;
    $comment->user_id = $data->userId;
    $comment->comment = $data->comment;
    $comment->save();

    return $comment;

  }

  public function deleteComment(int $id): void
  {
    $comment = Comment::findOrFail($id);
    $comment->delete();
  }
}