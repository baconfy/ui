<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia;

uses(RefreshDatabase::class);

/**
 * Rows go in directly, the same way the seeder writes them — there is no
 * Notification class yet.
 *
 * @param  array<string, mixed>  $data
 */
function notify(User $user, array $data = [], ?string $readAt = null, ?string $createdAt = null): void
{
    DB::table('notifications')->insert([
        'id' => Str::uuid()->toString(),
        'type' => 'default',
        'notifiable_type' => $user->getMorphClass(),
        'notifiable_id' => $user->getKey(),
        'data' => json_encode([...['type' => 'simple', 'title' => 'Something happened'], ...$data]),
        'read_at' => $readAt,
        'created_at' => $createdAt ?? now(),
        'updated_at' => $createdAt ?? now(),
    ]);
}

test('the notifications prop is read from the database', function () {
    $user = User::factory()->create();
    notify($user, ['title' => '**Ana** replied to your thread', 'icon' => 'MessageSquare', 'tone' => 'info']);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->has('notifications.data', 1)
            ->where('notifications.data.0.data.type', 'simple')
            ->where('notifications.data.0.data.title', '**Ana** replied to your thread')
            ->where('notifications.data.0.data.icon', 'MessageSquare')
            ->where('notifications.data.0.data.tone', 'info')
            ->where('notifications.data.0.read_at', null)
        );
});

test('the resource withholds the notifiable columns', function () {
    $user = User::factory()->create();
    notify($user);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(function (AssertableInertia $page) {
            $notification = $page->toArray()['props']['notifications']['data'][0];

            expect(array_keys($notification))->toEqualCanonicalizing(['id', 'data', 'read_at', 'created_at']);
        });
});

test('a read notification carries its read_at', function () {
    $user = User::factory()->create();
    notify($user, readAt: now()->subHour()->toDateTimeString());

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (AssertableInertia $page) => $page->whereNot('notifications.data.0.read_at', null));
});

test('notifications arrive newest first', function () {
    $user = User::factory()->create();
    notify($user, ['title' => 'Older'], createdAt: now()->subDay()->toDateTimeString());
    notify($user, ['title' => 'Newer']);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('notifications.data.0.data.title', 'Newer')
            ->where('notifications.data.1.data.title', 'Older')
        );
});

test('a user never sees another users notifications', function () {
    $mine = User::factory()->create();
    $theirs = User::factory()->create();
    notify($theirs, ['title' => 'Not for you']);

    $this->actingAs($mine)
        ->get(route('dashboard'))
        ->assertInertia(fn (AssertableInertia $page) => $page->where('notifications.data', []));
});

test('created_at is an ISO 8601 string the frontend can parse', function () {
    $user = User::factory()->create();
    notify($user);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(function (AssertableInertia $page) {
            expect($page->toArray()['props']['notifications']['data'][0]['created_at'])
                ->toMatch('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/');
        });
});

test('guests are not given a notifications prop at all', function () {
    $this->get(route('login'))
        ->assertInertia(fn (AssertableInertia $page) => $page->missing('notifications'));
});
