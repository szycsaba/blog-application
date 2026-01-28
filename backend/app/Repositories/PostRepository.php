<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository implements PostRepositoryInterface
{
    public function getPosts(): array
    {
        return Post::with(['user'])->get()->toArray();
    }
}