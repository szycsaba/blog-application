<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostWithCommentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user?->id,
            'name' => $this->user?->name,
            'title' => $this->title,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'comments' => $this->comments
                ?->map(fn ($comment) => [
                    'id' => $comment->id,
                    'post_id' => $comment->post_id,
                    'user_id' => $comment->user_id,
                    'comment' => $comment->comment,
                    'created_at' => $comment->created_at,
                    'updated_at' => $comment->updated_at,
                ])
                ->values()
                ->all() ?? [],
        ];
    }

}
