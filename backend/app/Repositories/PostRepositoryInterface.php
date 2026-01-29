<?php

namespace App\Repositories;

interface PostRepositoryInterface
{
    public function getPosts(): array;
    public function showPost(int $id): array;
    public function createPost(array $params): array;
    public function updatePost(array $params): array;
}