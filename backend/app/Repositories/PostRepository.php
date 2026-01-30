<?php

namespace App\Repositories;

use App\DTO\CreatePostData;
use App\DTO\UpdatePostData;
use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;

class PostRepository implements PostRepositoryInterface
{
    public function getPosts(): Collection
    {
        return Post::with(['user'])->orderByDesc('created_at')
            ->get();
    }

    public function showPost(int $id): Post
    {
        return Post::with([
            'user',
            'comments' => fn ($q) => $q->orderByDesc('created_at'),
            'comments.user',
        ])->findOrFail($id);
    }

    public function createPost(CreatePostData $data): Post
    {
        $post = new Post();
        $post->user_id = $data->userId;
        $post->title = $data->title;
        $post->content = $data->content;
        $post->save();

        return Post::with(['user'])
            ->findOrFail($post->id);
    }

    public function updatePost(UpdatePostData $data): Post
    {
        $post = Post::with('user')->findOrFail($data->id);

        $post->update([
            'title'   => $data->title,
            'content' => $data->content,
        ]);

        return $post;
    }

    public function deletePost(int $id): void
    {
        $post = Post::findOrFail($id);
        $post->delete();
    }

}