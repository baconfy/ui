<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

function makeDeletableNotification(User $user, ?string $readAt = null): string
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

test('guests cannot delete a notification', function () {
    $this->delete(route('notifications.destroy', Str::uuid()->toString()))->assertRedirect(route('login'));
});

test('a read notification can be deleted', function () {
    $user = User::factory()->create();
    $id = makeDeletableNotification($user, now()->toDateTimeString());

    $this->actingAs($user)
        ->from(route('dashboard'))
        ->delete(route('notifications.destroy', $id))
        ->assertRedirect(route('dashboard'));

    expect(DB::table('notifications')->find($id))->toBeNull();
});

test('an unread notification survives a delete', function () {
    $user = User::factory()->create();
    $id = makeDeletableNotification($user);

    // The whole point of the rule: nothing can be thrown away before it was
    // opened, so "I never got it" is not a story anybody can tell. Enforced on
    // the server, not only hidden in the interface.
    $this->actingAs($user)
        ->from(route('dashboard'))
        ->delete(route('notifications.destroy', $id))
        ->assertRedirect(route('dashboard'));

    expect(DB::table('notifications')->find($id))->not->toBeNull();
});

test('a user cannot delete another users read notification', function () {
    $mine = User::factory()->create();
    $theirs = User::factory()->create();
    $target = makeDeletableNotification($theirs, now()->toDateTimeString());

    $this->actingAs($mine)
        ->from(route('dashboard'))
        ->delete(route('notifications.destroy', $target))
        ->assertRedirect(route('dashboard'));

    expect(DB::table('notifications')->find($target))->not->toBeNull();
});

test('deleting one notification leaves the others alone', function () {
    $user = User::factory()->create();
    $target = makeDeletableNotification($user, now()->toDateTimeString());
    $keep = makeDeletableNotification($user, now()->toDateTimeString());

    $this->actingAs($user)->from(route('dashboard'))->delete(route('notifications.destroy', $target));

    expect(DB::table('notifications')->find($target))->toBeNull();
    expect(DB::table('notifications')->find($keep))->not->toBeNull();
});

test('an unknown id is a no-op rather than an error', function () {
    $user = User::factory()->create();
    makeDeletableNotification($user, now()->toDateTimeString());

    $this->actingAs($user)
        ->from(route('dashboard'))
        ->delete(route('notifications.destroy', Str::uuid()->toString()))
        ->assertRedirect(route('dashboard'));

    expect(DB::table('notifications')->count())->toBe(1);
});

test('the shared props drop the deleted row', function () {
    $user = User::factory()->create();
    $target = makeDeletableNotification($user, now()->toDateTimeString());
    makeDeletableNotification($user, now()->toDateTimeString());

    $this->actingAs($user)->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page->has('notifications.data', 2));

    $this->actingAs($user)->from(route('dashboard'))->delete(route('notifications.destroy', $target));

    $this->actingAs($user)->get(route('dashboard'))
        ->assertInertia(fn ($page) => $page->has('notifications.data', 1));
});
