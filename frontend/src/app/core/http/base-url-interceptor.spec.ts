import { TestBed } from "@angular/core/testing";
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";

import { baseUrlInterceptor } from "./base-url-interceptor";
import { HTTP_CONFIG, HttpConfig } from "./http.config";
import { of } from "rxjs";

describe("baseUrlInterceptor", () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => baseUrlInterceptor(req, next));
  const runInterceptor = (req: HttpRequest<unknown>) => {
    let capturedReq: HttpRequest<unknown> | null = null;
    const next: HttpHandlerFn = (request) => {
      capturedReq = request;
      return of(new HttpResponse({ status: 200 }));
    };
    TestBed.runInInjectionContext(() => baseUrlInterceptor(req, next));
    return capturedReq;
  };
  const mockBaseUrl = "http://mock-api";
  let httpConfig: HttpConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_CONFIG,
          useValue: { baseUrl: mockBaseUrl },
        },
      ],
    });
    httpConfig = TestBed.inject(HTTP_CONFIG);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  it("should prepend all requests with base url from http-config", () => {
    const req = new HttpRequest("GET", "/users");

    const capturedReq: HttpRequest<unknown> | null = runInterceptor(req);

    expect(capturedReq).not.toBeNull();
    expect(capturedReq?.url).toBe(`${httpConfig.baseUrl}/users`);
  });

  it("should not prepend the request when url is already absolute", () => {
    const req = new HttpRequest("GET", "http://external.example/users");

    const capturedReq: HttpRequest<unknown> | null = runInterceptor(req);

    expect(capturedReq).not.toBeNull();
    expect(capturedReq?.url).toBe("http://external.example/users");
  });
});
