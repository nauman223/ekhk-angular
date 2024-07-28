import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Login } from "./auth";
// import * as jwt_decode from 'jwt-decode';
// const jwt_decode = require('jwt-decode');
import jwt_decode from "jwt-decode";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    baseUrl: string = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private myRoute: Router
    ) { }

    sendToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    isLoggedIn() {
        if (this.isTokenExpired() === true) {
            this.myRoute.navigate([""]);
            localStorage.clear();
        }
        return this.isTokenExpired() === true ? false : true;
    }

    logout() {
        localStorage.clear();
        this.myRoute.navigate([""]);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        if (decoded['exp'] === undefined) { return null; }
        const date = new Date(0);
        date.setUTCSeconds(decoded['exp']);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) { token = this.getToken(); }
        if (!token) { return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        let bol = !(date.valueOf() > new Date().valueOf());
        return bol;
    }

    loginUser(login: Login): Observable<any> {
        return this.http.post<any>(this.baseUrl + "/user/login", login);
    }

    getUser = () => {
        let token = this.getToken();
        const decoded = jwt_decode(token);
        return decoded;
    }

}
