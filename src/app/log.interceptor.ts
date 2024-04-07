import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers.keys().map(key => `${key}: ${req.headers.get(key)}`));

    // Check if the Authorization header is present
    if (req.headers.has('Authorization')) {
      console.log('Authorization header:', req.headers.get('Authorization'));
    } else {
      console.log('Authorization header is missing.');
    }

    return next.handle(req);
 }
}
