<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository implements PostRepositoryInterface
{
    public function getPosts(): array
    {
        return Post::with(['user'])->get()->toArray();
    }

    public function showPost(int $id): array
    {
        return Post::with(['user', 'comments'])->findOrFail($id)->toArray();
    }

    public function createPost(array $data): array
    {
        return Post::create($data)->toArray();
    }
}