<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

class PostRepository implements PostRepositoryInterface
{
    public function getPosts(): Collection
    {
        return Post::with(['user'])
            ->get();
    }

    public function showPost(int $id): Post
    {
        return Post::with(['user', 'comments'])
            ->findOrFail($id);
    }

    public function createPost(array $params): Post
    {
        $post = new Post();
        $post->user_id = $params['user_id'];
        $post->title = $params['title'];
        $post->content = $params['content'];
        $post->save();

        return Post::with(['user'])
            ->findOrFail($post->id);
    }

    public function updatePost(array $params): Post
    {
        $post = Post::with('user')->findOrFail($params['id']);

        $post->update([
            'title'   => $params['title'],
            'content' => $params['content'],
        ]);

        return $post;
    }

}