import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public baseUrl = environment.baseUrl;
    // public responseCache = new Map();

    constructor(
        private http: HttpClient,
    ) { }

    get(url, params = null): Observable<any> {
        if (params) {
            return this.http
                .get(this.baseUrl + url, {
                    params
                })
                .pipe(
                    map(this.handleResponse),
                    catchError(this.handleError)
                );
        }
        return this.http.get(this.baseUrl + url).pipe(
            map(this.handleResponse),
            catchError(this.handleError)
        );
    }

    post(url, params): Observable<any> {
        return this.http.post(this.baseUrl + url, params).pipe(
            map(this.handleResponse),
            catchError(this.handleError)
        );
    }

    put(url, params): Observable<any> {
        return this.http.put(this.baseUrl + url, params).pipe(
            map(this.handleResponse),
            catchError(this.handleError)
        );
    }

    delete(url): Observable<any> {
        return this.http.delete(this.baseUrl + url).pipe(
            map(this.handleResponse),
            catchError(this.handleError)
        );
    }

    // public getApi(api): Observable<any> {
    //     const cacheData = this.responseCache.get(this.baseUrl + api);
    //     if (cacheData) {
    //         return of(cacheData);
    //     }
    //     const response = this.http
    //         .get(this.baseUrl + api)
    //         .pipe(
    //             map(this.handleResponse),
    //             catchError(this.handleError)
    //         );

    //     response.subscribe((read) =>
    //         this.responseCache.set(this.baseUrl + api, read)
    //     );
    //     return response;
    // }

    public handleResponse(data: any) {
        if (
            data &&
            data.status_code &&
            (data.status_code === 401)
        ) {
            window.location.href = "/";
        }
        return data;
    }

    public handleError(error: any) {
        if (error.status === 401 || error.status_code === 403) {
            localStorage.removeItem('token');
            localStorage.clear();
        }
        return throwError(error);
    }
}
