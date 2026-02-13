import { HttpInterceptorFn } from "@angular/common/http";

export const baseUrlInterceptor =
  (baseUrl: string): HttpInterceptorFn =>
  (req, next) => {
    if (req.url.startsWith("http")) {
      // skip if request already has base url
      return next(req);
    }
    const prependedReq = req.clone({
      url: `${baseUrl}${req.url}`,
    });
    return next(prependedReq);
  };
