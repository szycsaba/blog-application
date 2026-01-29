<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
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
    public function show(Post $post, PostService $postService)
    {
        $response = $postService->showPost($post->id);

        return response()->json($response->toArray(), $response->status);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post, PostService $postService): JsonResponse
    {
        $data = $request->validated();
        $data['id'] = $post->id;

        $response = $postService->updatePost($data);

        return response()->json($response->toArray(), $response->status);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
