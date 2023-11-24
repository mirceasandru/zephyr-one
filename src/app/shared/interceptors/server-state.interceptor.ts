import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { DataStateService } from '../services/data-state.service';


@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

  constructor(
    public dataStateService: DataStateService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(response => {
        if ((response instanceof HttpResponse && (response.status === 200 || response.status === 202))) {
          // console.log('SERVER: ', request.urlWithParams);
          this.dataStateService.setDynamicStateKey(request.urlWithParams, response.body);
        }
      }),
    );

  }

}