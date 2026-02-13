import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideNotification } from '@mfe/notification';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor, delayInterceptor } from '@mfe/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor('http://localhost:5195'),
        delayInterceptor(300),
      ]),
    ),
    provideNotification(),
  ],
};
