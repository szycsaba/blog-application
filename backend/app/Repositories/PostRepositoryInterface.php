<?php

namespace App\Repositories;

use App\DTO\CreatePostData;
use App\DTO\UpdatePostData;
use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

interface PostRepositoryInterface
{
    public function getPosts(): Collection;
    public function showPost(int $id): Post;
    public function createPost(CreatePostData $data): Post;
    public function updatePost(UpdatePostData $data): Post;
    public function deletePost(int $id): void;
}