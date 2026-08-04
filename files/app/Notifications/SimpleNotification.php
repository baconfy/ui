<?php

declare(strict_types=1);

namespace app\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class SimpleNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    /**
     * @param  string|null  $icon  A Lucide name the panel knows how to draw.
     * @param  string  $tone  neutral | info | success | warning | danger
     */
    public function __construct(
        public string $title,
        public ?string $icon = null,
        public string $tone = 'neutral',
        public ?string $url = null,
    ) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * The slug in `type` is what the frontend registry keys on — deliberately
     * not the class name, so renaming or moving this class never breaks the UI.
     *
     * @return array{type: string, title: string, icon: ?string, tone: string, url: ?string}
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'simple',
            'title' => $this->title,
            'icon' => $this->icon,
            'tone' => $this->tone,
            'url' => $this->url,
        ];
    }

    /**
     * The broadcast payload mirrors what the panel already renders, so a row
     * arriving live is shaped exactly like one that came from the database.
     *
     * `id` and `created_at` are added by Laravel; `read_at` is always null on a
     * notification that has only just been created.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'read_at' => null,
            'data' => $this->toArray($notifiable),
        ]);
    }
}
