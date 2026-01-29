<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository implements PostRepositoryInterface
{
    public function getPosts(): array
    {
        return Post::with(['user'])
            ->get()
            ->toArray();
    }

    public function showPost(int $id): array
    {
        return Post::with(['user', 'comments'])
            ->findOrFail($id)
            ->toArray();
    }

    public function createPost(array $params): array
    {
        $post = new Post();
        $post->user_id = $params['user_id'];
        $post->title = $params['title'];
        $post->content = $params['content'];
        $post->save();

        return Post::with(['user'])
            ->findOrFail($post->id)
            ->toArray();
    }

    public function updatePost(array $params): array
    {
        $post = Post::with('user')->findOrFail($params['id']);

        $post->update([
            'title'   => $params['title'],
            'content' => $params['content'],
        ]);

        return $post->toArray();
    }

}