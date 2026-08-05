<?php

declare(strict_types=1);

use App\Http\Controllers\Notifications\DestroyNotificationController;
use App\Http\Controllers\Notifications\MarkNotificationAsReadController;
use App\Http\Controllers\Notifications\OpenNotificationController;
use Illuminate\Support\Facades\Route;

// Landing page
Route::inertia('/', 'welcome')->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard routes
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');

    // Notification routes
    Route::get('notifications/{notification}', OpenNotificationController::class)->name('notifications.open');
    Route::patch('notifications/{notification?}', MarkNotificationAsReadController::class)->name('notifications.read');
    Route::delete('notifications/{notification}', DestroyNotificationController::class)->name('notifications.destroy');
});
