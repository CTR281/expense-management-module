import { HttpParams } from "@angular/common/http";

export function toHttpParams<T extends Record<string, any>>(
  query?: T
): HttpParams {
  if (!query) return;
  return new HttpParams({
    fromObject: Object.fromEntries(
      Object.entries(query).filter(([, value]) => value !== undefined)
    ),
  });
}
