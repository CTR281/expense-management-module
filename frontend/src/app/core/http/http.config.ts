import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from "@angular/core";

export interface HttpConfig {
  baseUrl: string;
}

export const HTTP_CONFIG = new InjectionToken<HttpConfig>("HttpConfig");

export function provideHttpConfig(config: HttpConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: HTTP_CONFIG,
      useValue: config,
    },
  ]);
}

//todo withBaseUrlInterceptor
