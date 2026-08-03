<?php

namespace app\Http\Middleware;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;
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
    private const NOTIFICATION_LIMIT = 20;

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
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            // `resolve()` and not the collection itself: a JsonResource wraps its
            // payload in a `data` key when serialised, which an Inertia prop has no
            // use for. Resolving here beats disabling wrapping app-wide.
            'notifications' => NotificationResource::collection(
                $request->user()?->notifications()->latest()->limit(self::NOTIFICATION_LIMIT)->get() ?? collect()
            )->resolve($request),
            'layout' => [
                'variant' => $request->user()?->sidebar_variant ?? 'floating',
                'collapsible' => $request->user()?->sidebar_collapsible ?? 'icon',
                'side' => $request->user()?->sidebar_side ?? 'left',
            ],

        ];
    }
}
