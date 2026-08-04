<?php

declare(strict_types=1);

namespace app\Http\Controllers\Notifications;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class OpenNotificationController
{
    /**
     * Read a notification, then go wherever it points.
     *
     * `GET` on a route that writes is a deliberate trade. This is the row's own
     * link, and being a link is what makes cmd-click, middle-click and "open in
     * new tab" work — the things a reader expects from something that navigates.
     * The write is idempotent, so a prefetch or a second visit changes nothing
     * beyond what the first one already did.
     *
     * Scoped to the signed-in user's own notifications, so an id belonging to
     * somebody else matches nothing and falls through to `back()` — the same
     * answer a row with no target gets. The response never says which happened.
     */
    public function __invoke(Request $request, string $notification): Response
    {
        $target = $request->user()->notifications()->whereKey($notification)->first();

        if (! $target) {
            return back();
        }

        $target->markAsRead();

        $url = $target->data['url'] ?? null;

        if (! $url) {
            return back();
        }

        return str_starts_with($url, '/') ? redirect($url) : Inertia::location($url);
    }
}
