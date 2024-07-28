import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('token');

        console.log('isTokenExpired', this.tokenService.isTokenExpired())
        if (this.tokenService.isTokenExpired()) {
            localStorage.clear();
        }
        const modifiedReq =  req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userToken ? userToken : ''}`),
        })
        return next.handle(modifiedReq);
    }
}