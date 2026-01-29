<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request, CommentService $commentService, int $post): JsonResponse
    {
        $params = $request->validated();
        $params['post_id'] = $post;

        $response = $commentService->createComment($params);

        return response()->json($response->toArray(),$response->status);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment, CommentService $commentService): JsonResponse
    {
        $response = $commentService->deleteComment($comment->id);

        return response()->json($response->toArray(), $response->status);
    }
}
