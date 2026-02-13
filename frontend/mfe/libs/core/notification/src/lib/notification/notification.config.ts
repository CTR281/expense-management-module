import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NotificationService } from './notification-service';

export function provideNotification(duration?: number): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: NotificationService,
      useFactory: () => new NotificationService(duration),
    },
  ]);
}
