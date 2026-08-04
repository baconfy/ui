<?php

declare(strict_types=1);

namespace App\Http\Controllers\Notifications;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DestroyNotificationController
{
    /**
     * Delete a notification the reader has already opened.
     *
     * `readNotifications()` and not `notifications()`: something never opened
     * cannot be thrown away, so "I never got it" stops being an available
     * story — the row had to be read before it could be deleted. The interface
     * only offers the control on read rows, but the rule is enforced here,
     * where a hand-made request cannot step around it.
     *
     * Scoped to the signed-in user, so an id belonging to somebody else matches
     * nothing. Deleting matches nothing and deleting an unread row of your own
     * both answer the same way, and the response never says which happened.
     */
    public function __invoke(Request $request, string $notification): RedirectResponse
    {
        $request->user()
            ->readNotifications()
            ->whereKey($notification)
            ->delete();

        return back();
    }
}
