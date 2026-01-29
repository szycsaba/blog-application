<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{post}', [PostController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user/me', [UserController::class, 'me']);
    Route::post('posts', [PostController::class, 'store']);
    Route::get('posts/{post}/edit', [PostController::class, 'show'])->middleware(['can:view,post']);
    Route::put('posts/{post}', [PostController::class, 'update'])->middleware(['can:update,post']);
    Route::delete('posts/{post}', [PostController::class, 'destroy'])->middleware(['can:delete,post']);
});
