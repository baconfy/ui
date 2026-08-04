<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

uses(RefreshDatabase::class);

function seed(User $user, int $count): void
{
    foreach (range(1, $count) as $i) {
        DB::table('notifications')->insert([
            'id' => Str::uuid()->toString(),
            'type' => 'default',
            'notifiable_type' => $user->getMorphClass(),
            'notifiable_id' => $user->getKey(),
            'data' => json_encode(['type' => 'simple', 'title' => "Notification {$i}"]),
            'read_at' => null,
            'created_at' => now()->subMinutes($i),
            'updated_at' => now()->subMinutes($i),
        ]);
    }
}

/** The page object outgrows the `data-page` attribute and moves into a script tag. */
function pageObject(string $html): array
{
    preg_match('/<script[^>]*type="application\/json"[^>]*>(.*?)<\/script>/s', $html, $script);

    if (isset($script[1])) {
        return json_decode($script[1], true) ?? [];
    }

    preg_match('/data-page="([^"]*)"/', $html, $attr);

    return json_decode(html_entity_decode($attr[1] ?? '{}'), true) ?? [];
}

test('the notifications cursor is named, not the default', function () {
    $user = User::factory()->create();
    seed($user, 30);

    $page = pageObject($this->actingAs($user)->get(route('dashboard'))->getContent());

    expect($page['scrollProps']['notifications']['pageName'])->toBe('notifications');
});

test('a page with its own infinite scroll keeps its own cursor', function () {
    $user = User::factory()->create();
    seed($user, 30);

    // A page paginating something else, on the default cursor name.
    Route::middleware(['web', 'auth'])->get('/products', fn () => Inertia::render('dashboard', [
        'products' => Inertia::scroll(fn () => DB::table('notifications')->orderBy('created_at')->cursorPaginate(5)),
    ]))->name('products');

    $page = pageObject($this->actingAs($user)->get('/products')->getContent());

    expect(array_keys($page['scrollProps']))->toEqualCanonicalizing(['notifications', 'products']);
    expect($page['scrollProps']['notifications']['pageName'])->toBe('notifications');
    expect($page['scrollProps']['products']['pageName'])->toBe('cursor');
});

test('paginating the page does not move the notifications list', function () {
    $user = User::factory()->create();
    seed($user, 30);

    Route::middleware(['web', 'auth'])->get('/products', fn () => Inertia::render('dashboard', [
        'products' => Inertia::scroll(fn () => DB::table('notifications')->orderBy('created_at')->cursorPaginate(5)),
    ]))->name('products');

    $first = pageObject($this->actingAs($user)->get('/products')->getContent());
    $productCursor = $first['scrollProps']['products']['nextPage'];
    $firstNotification = $first['props']['notifications']['data'][0]['data']['title'];

    // The page asks for its second page of products, on `?cursor=`.
    $second = pageObject($this->actingAs($user)->get('/products?cursor='.$productCursor)->getContent());

    expect($second['props']['notifications']['data'][0]['data']['title'])
        ->toBe($firstNotification)
        ->and($second['props']['notifications']['data'])->toHaveCount(20);
});

test('paginating notifications does not move the page list', function () {
    $user = User::factory()->create();
    seed($user, 30);

    Route::middleware(['web', 'auth'])->get('/products', fn () => Inertia::render('dashboard', [
        'products' => Inertia::scroll(fn () => DB::table('notifications')->orderBy('created_at')->cursorPaginate(5)),
    ]))->name('products');

    $first = pageObject($this->actingAs($user)->get('/products')->getContent());
    $notificationCursor = $first['scrollProps']['notifications']['nextPage'];
    $firstProduct = $first['props']['products']['data'][0]->id ?? $first['props']['products']['data'][0]['id'];

    // The panel asks for its second page, on `?notifications=`.
    $second = pageObject($this->actingAs($user)->get('/products?notifications='.$notificationCursor)->getContent());
    $stillFirstProduct = $second['props']['products']['data'][0]['id'];

    expect($stillFirstProduct)->toBe($firstProduct)
        ->and($second['props']['products']['data'])->toHaveCount(5)
        ->and($second['props']['notifications']['data'][0]['data']['title'])->toBe('Notification 21');
});
