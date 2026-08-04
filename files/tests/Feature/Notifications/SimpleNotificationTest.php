<?php

use App\Models\User;
use App\Notifications\SimpleNotification;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;

uses(RefreshDatabase::class);

test('it is written to the database in the shape the panel reads', function () {
    $user = User::factory()->create();

    $user->notify(new SimpleNotification('**Ana** replied to your thread', 'MessageSquare', 'info', '/threads/1'));

    $stored = $user->notifications()->sole();

    expect($stored->data)->toBe([
        'type' => 'simple',
        'title' => '**Ana** replied to your thread',
        'icon' => 'MessageSquare',
        'tone' => 'info',
        'url' => '/threads/1',
    ]);
    expect($stored->read_at)->toBeNull();
});

test('the type slug is not the class name, so renaming the class cannot break the UI', function () {
    $user = User::factory()->create();

    $user->notify(new SimpleNotification('Anything'));

    $stored = $user->notifications()->sole();

    expect($stored->data['type'])->toBe('simple')
        ->and($stored->type)->toBe(SimpleNotification::class);
});

test('it broadcasts as well as persisting', function () {
    $user = User::factory()->create();
    $notification = new SimpleNotification('Anything');

    expect($notification)->toBeInstanceOf(ShouldBroadcast::class)
        ->and($notification->via($user))->toBe(['database', 'broadcast']);
});

test('the broadcast payload matches what a stored row looks like', function () {
    $user = User::factory()->create();
    $notification = new SimpleNotification('The nightly backup **failed**', 'TriangleAlert', 'danger');

    $payload = $notification->toBroadcast($user)->data;

    expect($payload)->toHaveKeys(['read_at', 'data'])
        ->and($payload['read_at'])->toBeNull()
        ->and($payload['data'])->toBe($notification->toArray($user));
});

test('defaults keep the payload complete', function () {
    $user = User::factory()->create();

    $user->notify(new SimpleNotification('Just a title'));

    expect($user->notifications()->sole()->data)->toBe([
        'type' => 'simple',
        'title' => 'Just a title',
        'icon' => null,
        'tone' => 'neutral',
        'url' => null,
    ]);
});

test('a notification reaches only its own user', function () {
    Notification::fake();

    $mine = User::factory()->create();
    $theirs = User::factory()->create();

    $mine->notify(new SimpleNotification('For me'));

    Notification::assertSentTo($mine, SimpleNotification::class);
    Notification::assertNotSentTo($theirs, SimpleNotification::class);
});
