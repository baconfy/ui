<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;
use function Orchestra\Testbench\default_skeleton_path;

return Application::configure(basePath: $APP_BASE_PATH ?? default_skeleton_path())
  ->withRouting(
    web: __DIR__.'/../routes/web.php',
    commands: __DIR__.'/../routes/console.php',
  )
  ->withMiddleware(function (Middleware $middleware) {
      $middleware->web(append: [
        HandleInertiaRequests::class,
      ]);
  })
  ->withExceptions(function (Exceptions $exceptions) {
      //
  })->create();
