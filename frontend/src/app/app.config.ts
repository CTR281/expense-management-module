import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { appRoutes } from "./app.routes";
import { baseUrlInterceptor } from "./core/http/base-url-interceptor";
import { delayInterceptor } from "./core/http/delay-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor("http://localhost:5195"),
        delayInterceptor(750),
      ])
    ),
  ],
};
