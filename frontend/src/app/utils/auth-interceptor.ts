import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken: string | null = localStorage.getItem('token');
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('tok ' + authToken);
    return next.handle(authRequest);
  }
}
