<?php

namespace App\DTO;

class UpdatePostData
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly string $content,
    ) {}
}
