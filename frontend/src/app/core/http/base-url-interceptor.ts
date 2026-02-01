import { HttpInterceptorFn } from "@angular/common/http";
import { HTTP_CONFIG } from "./http.config";
import { inject } from "@angular/core";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith("http")) {
    // skip if request already has base url
    return next(req);
  }
  const prependedReq = req.clone({
    url: `${inject(HTTP_CONFIG).baseUrl}${req.url}`,
  });
  return next(prependedReq);
};
