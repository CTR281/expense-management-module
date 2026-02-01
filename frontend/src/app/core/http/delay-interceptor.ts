import { HttpInterceptorFn } from "@angular/common/http";
import { delay } from "rxjs";

/**
 * Showcase loading by adding to delay to every request
 * @param duration
 */
export const delayInterceptor =
  (duration: number): HttpInterceptorFn =>
  (req, next) =>
    next(req).pipe(delay(duration));
