<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

/**
 * Rows go in directly, the same way the seeder writes them.
 */
function makeNotification(User $user, ?string $readAt = null): string
{
    $id = Str::uuid()->toString();

    DB::table('notifications')->insert([
        'id' => $id,
        'type' => 'default',
        'notifiable_type' => $user->getMorphClass(),
        'notifiable_id' => $user->getKey(),
        'data' => json_encode(['type' => 'simple', 'title' => 'Something happened']),
        'read_at' => $readAt,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return $id;
}

test('guests cannot mark notifications as read', function () {
    $this->patch(route('notifications.read'))->assertRedirect(route('login'));
});

test('an id marks only that notification as read', function () {
    $user = User::factory()->create();
    $target = makeNotification($user);
    $other = makeNotification($user);

    $this->actingAs($user)
        ->from(route('dashboard'))
        ->patch(route('notifications.read', $target))
        ->assertRedirect(route('dashboard'));

    expect(DB::table('notifications')->find($target)->read_at)->not->toBeNull();
    expect(DB::table('notifications')->find($other)->read_at)->toBeNull();
});

test('no id marks every unread notification as read', function () {
    $user = User::factory()->create();
    $first = makeNotification($user);
    $second = makeNotification($user);
    $third = makeNotification($user);

    $this->actingAs($user)->from(route('dashboard'))->patch(route('notifications.read'));

    expect($user->unreadNotifications()->count())->toBe(0);
    expect(collect([$first, $second, $third])->every(fn ($id) => DB::table('notifications')->find($id)->read_at !== null))->toBeTrue();
});

test('a notification already read keeps its original timestamp', function () {
    $user = User::factory()->create();
    $readAt = now()->subDays(3)->startOfSecond();
    $id = makeNotification($user, $readAt->toDateTimeString());

    $this->actingAs($user)->from(route('dashboard'))->patch(route('notifications.read'));

    expect(DB::table('notifications')->find($id)->read_at)->toBe($readAt->toDateTimeString());
});

test('a user cannot mark another users notification as read', function () {
    $mine = User::factory()->create();
    $theirs = User::factory()->create();
    $target = makeNotification($theirs);

    $this->actingAs($mine)->from(route('dashboard'))->patch(route('notifications.read', $target));

    expect(DB::table('notifications')->find($target)->read_at)->toBeNull();
});

test('marking all as read leaves other users untouched', function () {
    $mine = User::factory()->create();
    $theirs = User::factory()->create();
    makeNotification($mine);
    $target = makeNotification($theirs);

    $this->actingAs($mine)->from(route('dashboard'))->patch(route('notifications.read'));

    expect($mine->unreadNotifications()->count())->toBe(0);
    expect(DB::table('notifications')->find($target)->read_at)->toBeNull();
});

test('an unknown id is a no-op rather than an error', function () {
    $user = User::factory()->create();
    makeNotification($user);

    $this->actingAs($user)
        ->from(route('dashboard'))
        ->patch(route('notifications.read', Str::uuid()->toString()))
        ->assertRedirect(route('dashboard'));

    expect($user->unreadNotifications()->count())->toBe(1);
});

test('the unread count in the shared props reflects the change', function () {
    $user = User::factory()->create();
    makeNotification($user);
    makeNotification($user);

    $this->actingAs($user)->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page->where('unreadCount', 2));

    $this->actingAs($user)->from(route('dashboard'))->patch(route('notifications.read'));

    $this->actingAs($user)->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page->where('unreadCount', 0));
});
