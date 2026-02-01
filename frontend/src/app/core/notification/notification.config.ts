import { InjectionToken } from "@angular/core";

export const NOTIFICATION_DURATION = new InjectionToken<number>(
  "NOTIFICATION_DURATION",
  {
    providedIn: "root",
    factory: () => 3000,
  }
);
