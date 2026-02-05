import { Component, inject } from "@angular/core";
import { NotificationService } from "./notification-service";
import { IconCloseComponent } from "../../shared/ui/icons/icon-close";

@Component({
  selector: "app-notification",
  imports: [IconCloseComponent],
  templateUrl: "./notification.html",
  styleUrl: "./notification.css",
})
export class Notification {
  protected readonly notificationService = inject(NotificationService);
}
