<?php

declare(strict_types=1);

namespace app\Http\Middleware;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * The panel is a glance, not an archive — the full history belongs on its own
     * page. Enough rows to fill the scroll area and prove there is more.
     */
    private const int NOTIFICATION_LIMIT = 20;

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'auth' => [
                'user' => $request->user(),
            ],
            ...($request->user() ? [
                // `matchOn('id')` is what makes a partial reload able to *update* a
                // row instead of appending a second copy of it. Without it the merge
                // is a blind append: reloading page one after marking everything read
                // would leave the original rows untouched and duplicate all twenty.
                'notifications' => Inertia::scroll(fn () => NotificationResource::collection(
                    $request->user()->notifications()->latest()->cursorPaginate(self::NOTIFICATION_LIMIT, ['*'], 'notifications')
                ))->matchOn('data.id'),
                'unreadCount' => $request->user()->unreadNotifications()->count(),
            ] : []),
            'layout' => [
                'variant' => $request->user()?->sidebar_variant ?? 'floating',
                'collapsible' => $request->user()?->sidebar_collapsible ?? 'icon',
                'side' => $request->user()?->sidebar_side ?? 'left',
            ],
        ];
    }
}
