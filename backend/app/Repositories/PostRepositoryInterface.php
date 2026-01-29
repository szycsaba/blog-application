<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

interface PostRepositoryInterface
{
    public function getPosts(): Collection;
    public function showPost(int $id): Post;
    public function createPost(array $params): Post;
    public function updatePost(array $params): Post;
    public function deletePost(int $id): void;
}