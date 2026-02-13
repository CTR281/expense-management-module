import { signal } from '@angular/core';
import { NotificationType, Notification } from './notification.model';

export class NotificationService {
  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  constructor(private readonly duration = 3000) {}

  error(message: string) {
    this.add('error', message);
  }

  success(message: string) {
    this.add('success', message);
  }

  remove(id: string): void {
    this._notifications.update((notifications) =>
      notifications.filter((notification) => notification.id !== id),
    );
  }

  private add(type: NotificationType, message: string) {
    const notification: Notification = {
      id: crypto.randomUUID(),
      type,
      message,
    };

    this._notifications.update((notifications) => [
      ...notifications,
      notification,
    ]);

    setTimeout(() => this.remove(notification.id), this.duration);
  }
}
