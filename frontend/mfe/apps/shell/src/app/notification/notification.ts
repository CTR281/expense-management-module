import { Component, inject } from '@angular/core';
import { NotificationService } from '@mfe/notification';
import { IconCloseComponent } from '@mfe/icons';

@Component({
  selector: 'mfe-notification',
  imports: [IconCloseComponent],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  protected readonly notificationService = inject(NotificationService);
}
