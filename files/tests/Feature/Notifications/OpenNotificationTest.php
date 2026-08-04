<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

/**
 * Rows go in directly, the same way the seeder writes them. `url` is omitted
 * entirely when there is none, rather than stored as null, because that is what
 * a notification with nowhere to go actually looks like.
 */
function makeOpenableNotification(User $user, ?string $url = null, ?string $readAt = null): string
{
    $id = Str::uuid()->toString();

    DB::table('notifications')->insert([
        'id' => $id,
        'type' => 'default',
        'notifiable_type' => $user->getMorphClass(),
        'notifiable_id' => $user->getKey(),
        'data' => json_encode(array_filter(['type' => 'simple', 'title' => 'Something happened', 'url' => $url])),
        'read_at' => $readAt,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return $id;
}

test('guests cannot open a notification', function () {
    $this->get(route('notifications.open', Str::uuid()->toString()))->assertRedirect(route('login'));
});

test('a relative url marks the notification read and redirects there', function () {
    $user = User::factory()->create();
    $id = makeOpenableNotification($user, '/dashboard');

    $this->actingAs($user)
        ->from(route('home'))
        ->get(route('notifications.open', $id))
        ->assertRedirect('/dashboard');

    expect(DB::table('notifications')->find($id)->read_at)->not->toBeNull();
});

test('a notification with no url marks read and goes back', function () {
    $user = User::factory()->create();
    $id = makeOpenableNotification($user);

    $this->actingAs($user)
        ->from(route('dashboard'))
        ->get(route('notifications.open', $id))
        ->assertRedirect(route('dashboard'));

    expect(DB::table('notifications')->find($id)->read_at)->not->toBeNull();
});

test('an absolute url is handed to the browser as a full page load', function () {
    $user = User::factory()->create();
    $id = makeOpenableNotification($user, 'https://laravel.com/docs');

    // The version header is not decoration. Without it Inertia answers 409 for a
    // stale asset bundle — the same status, pointing at the requested url — and
    // the test would pass without the controller having done anything. Asserting
    // the header's value is the other half of that guard.
    $this->actingAs($user)
        ->withHeaders([
            'X-Inertia' => 'true',
            'X-Inertia-Version' => app(HandleInertiaRequests::class)->version(request()),
        ])
        ->get(route('notifications.open', $id))
        ->assertStatus(409)
        ->assertHeader('X-Inertia-Location', 'https://laravel.com/docs');

    expect(DB::table('notifications')->find($id)->read_at)->not->toBeNull();
});

test('an absolute url is an ordinary redirect outside of an inertia visit', function () {
    $user = User::factory()->create();
    $id = makeOpenableNotification($user, 'https://laravel.com/docs');

    $this->actingAs($user)
        ->get(route('notifications.open', $id))
        ->assertRedirect('https://laravel.com/docs');
});

test('a user cannot open another users notification', function () {
    $mine = User::factory()->create();
    $theirs = User::factory()->create();
    $target = makeOpenableNotification($theirs, '/dashboard');

    // Same answer an unknown id gets, so the response never confirms the id exists.
    $this->actingAs($mine)
        ->from(route('home'))
        ->get(route('notifications.open', $target))
        ->assertRedirect(route('home'));

    expect(DB::table('notifications')->find($target)->read_at)->toBeNull();
});

test('an unknown id is a no-op rather than an error', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from(route('home'))
        ->get(route('notifications.open', Str::uuid()->toString()))
        ->assertRedirect(route('home'));
});

test('opening a notification twice keeps the first read timestamp', function () {
    $user = User::factory()->create();
    $readAt = now()->subDays(3)->startOfSecond();
    $id = makeOpenableNotification($user, '/dashboard', $readAt->toDateTimeString());

    $this->actingAs($user)->get(route('notifications.open', $id))->assertRedirect('/dashboard');

    expect(DB::table('notifications')->find($id)->read_at)->toBe($readAt->toDateTimeString());
});

test('the unread count in the shared props reflects the open', function () {
    $user = User::factory()->create();
    $id = makeOpenableNotification($user);
    makeOpenableNotification($user);

    $this->actingAs($user)->get(route('dashboard'))->assertInertia(fn ($page) => $page->where('unreadCount', 2));

    $this->actingAs($user)->from(route('dashboard'))->get(route('notifications.open', $id));

    $this->actingAs($user)->get(route('dashboard'))->assertInertia(fn ($page) => $page->where('unreadCount', 1));
});
