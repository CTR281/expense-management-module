import { inject, Injectable, signal } from "@angular/core";
import { NotificationType, Notification } from "./notification.model";
import { NOTIFICATION_DURATION } from "./notification.config";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private readonly duration = inject(NOTIFICATION_DURATION);
  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  error(message: string) {
    this.add("error", message);
  }

  success(message: string) {
    this.add("success", message);
  }

  remove(id: string): void {
    this._notifications.update((notifications) =>
      notifications.filter((notification) => notification.id !== id)
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
