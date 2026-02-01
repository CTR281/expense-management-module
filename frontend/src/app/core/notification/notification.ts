import { Component, inject } from "@angular/core";
import { NotificationService } from "./notification-service";

@Component({
  selector: "app-notification",
  imports: [],
  templateUrl: "./notification.html",
  styleUrl: "./notification.css",
})
export class Notification {
  protected readonly notificationService = inject(NotificationService);
}
