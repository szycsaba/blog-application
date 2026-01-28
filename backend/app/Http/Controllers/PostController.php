<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(PostService $postService): JsonResponse
    {
        $response = $postService->getPosts();

        return response()->json($response->toArray(), $response->status);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request, PostService $postService): JsonResponse
    {
        $response = $postService->createPost($request->validated());

        return response()->json($response->toArray(), $response->status);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $post, PostService $postService)
    {
        $response = $postService->showPost($post);

        return response()->json($response->toArray(), $response->status);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
