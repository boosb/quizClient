import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "../models/user";
import { delay, Observable, catchError, throwError, retry, tap } from 'rxjs';
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ) {}

    users: IUser[] = [];

    getAll(): Observable<IUser[]> {
        return this.http.get<IUser[]>('https://fakestoreapi.com/products', {
            params: new HttpParams({
                fromObject: {limit: 5}
            })
        }).pipe(
            retry(2),
            tap((users: IUser[]) => this.users = users),
            catchError(this.errorHandler.bind(this))
        );
    }

    create(user: IUser): Observable<IUser> {
        return this.http.post<IUser>('https://fakestoreapi.com/products', user)
            .pipe(
                tap(user => this.users.push(user))
            );
    }

    private errorHandler(error: HttpErrorResponse) {
        this.errorService.handle(error.message);
        return throwError(() => error.message);
    }
}