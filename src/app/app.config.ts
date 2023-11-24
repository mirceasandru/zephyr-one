import { APP_ID, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouteReuseStrategy, RouterModule, provideRouter, withComponentInputBinding, withDebugTracing, withDisabledInitialNavigation, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { MaterialModule } from './shared/modules/material.module';
import { ServerStateInterceptor } from './shared/interceptors/server-state.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes,
      withDebugTracing(),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    { provide: AppService, useClass: AppService },
    { provide: environment.apiPath, useValue: environment.apiPath },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerStateInterceptor, multi: true },
    { provide: APP_ID, useValue: 'zoui' },
    importProvidersFrom(
      BrowserModule,
      MaterialModule,
    )
  ]
};
