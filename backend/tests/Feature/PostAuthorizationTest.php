<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PostAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_edit_requires_owner(): void
    {
        $owner = User::create([
            'name' => 'Owner',
            'email' => 'owner@example.com',
            'password' => 'password',
        ]);
        $other = User::create([
            'name' => 'Other',
            'email' => 'other@example.com',
            'password' => 'password',
        ]);

        $post = Post::create([
            'user_id' => $owner->id,
            'title' => 'Owner post',
            'content' => 'Owner content',
        ]);

        Sanctum::actingAs($owner);
        $this->getJson("/posts/{$post->id}/edit")
            ->assertOk();

        Sanctum::actingAs($other);
        $this->getJson("/posts/{$post->id}/edit")
            ->assertStatus(403);
    }
}
