<?php

declare(strict_types=1);

namespace App\Http\Controllers\Notifications;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MarkNotificationAsReadController
{
    /**
     * Mark one notification as read, or every unread one when no id is given.
     *
     * The query starts from the signed-in user's own notifications, so an id
     * belonging to somebody else simply matches nothing. That is authorization by
     * construction rather than by check — there is no branch to forget, and no
     * 404 to tell an attacker whether the id exists.
     */
    public function __invoke(Request $request, ?string $notification = null): RedirectResponse
    {
        $request->user()
            ->unreadNotifications()
            ->when($notification, fn ($query) => $query->whereKey($notification))
            ->update(['read_at' => now()]);

        return back();
    }
}
