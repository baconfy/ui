<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('the layout prop falls back to the application defaults when the user has no preference', function () {
    $user = User::factory()->create([
        'sidebar_variant' => null,
        'sidebar_collapsible' => null,
        'sidebar_side' => null,
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('layout.variant', 'floating')
            ->where('layout.collapsible', 'icon')
            ->where('layout.side', 'left')
        );
});

test('the layout prop reflects the stored preference of the user', function () {
    $user = User::factory()->create([
        'sidebar_variant' => 'inset',
        'sidebar_collapsible' => 'offcanvas',
        'sidebar_side' => 'right',
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->where('layout.variant', 'inset')
            ->where('layout.collapsible', 'offcanvas')
            ->where('layout.side', 'right')
        );
});
