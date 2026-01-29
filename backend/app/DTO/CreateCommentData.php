<?php

namespace App\DTO;

class CreateCommentData
{
    public function __construct(
        public readonly int $postId,
        public readonly ?int $userId,
        public readonly string $comment,
    ) {}
}
