import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const currentUser = '1110515315';
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          'authorId': `${currentUser}`,
          'Cache-control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Access-Control-Allow-Origin': '*',
          'Cache-control': 'no-cache',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
    }

    return next.handle(request);
  }
}
