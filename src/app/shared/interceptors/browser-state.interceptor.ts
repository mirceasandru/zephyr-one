import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';

import { Observable, of, tap } from 'rxjs';
import { DataStateService } from '../services/data-state.service';


@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {

    constructor(
        public dataStateService: DataStateService,
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.method === 'GET') {
            const storedResponse: any = this.dataStateService.getDynamicStateKey(request.urlWithParams);
            if (storedResponse) {
                // console.log('BROWSER: ', request.urlWithParams);
                const response = new HttpResponse({ body: storedResponse, status: 200 });
                return of(response);
            }
        }

        return next.handle(request);
    }

}