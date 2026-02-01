import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { appRoutes } from "./app.routes";
import { provideHttpConfig } from "./core/http/http.config";
import { baseUrlInterceptor } from "./core/http/base-url-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideHttpConfig({ baseUrl: "http://localhost:5195" }),
  ],
};
