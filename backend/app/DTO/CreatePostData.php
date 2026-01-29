<?php

namespace App\DTO;

class CreatePostData
{
    public function __construct(
        public readonly int $userId,
        public readonly string $title,
        public readonly string $content,
    ) {}
}
