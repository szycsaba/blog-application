<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_delete_any_post_and_comment(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'is_admin' => true,
        ]);
        $owner = User::create([
            'name' => 'Owner',
            'email' => 'owner@example.com',
            'password' => 'password',
        ]);

        $post = Post::create([
            'user_id' => $owner->id,
            'title' => 'Owner post',
            'content' => 'Owner content',
        ]);

        $comment = Comment::create([
            'post_id' => $post->id,
            'user_id' => $owner->id,
            'comment' => 'Owner comment',
        ]);

        Sanctum::actingAs($admin);

        $this->deleteJson("/comments/{$comment->id}")
            ->assertOk();

        $this->deleteJson("/posts/{$post->id}")
            ->assertOk();
    }
}
