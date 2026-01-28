<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: '',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        
        $exceptions->render(function (Throwable $exception, Request $request) {

            $status = $exception instanceof HttpExceptionInterface
                ? $exception->getStatusCode()
                : 500;
    
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], $status);
        });

    })->create();
