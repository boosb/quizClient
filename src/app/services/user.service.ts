import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError, tap } from 'rxjs';
import { ErrorService } from "./error.service";
import { IUser } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ) {}

    users: IUser[] = [];

    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>('http://localhost:3000/user/all')
            .pipe(
                tap((users: IUser[]) => {
                    this.users = users;
                }),
                catchError(this.errorHandler.bind(this))
            );
    }

    private errorHandler(error: HttpErrorResponse) { // todo метод повторяется (in question.service), полумать как уйти от этого
        this.errorService.handle(error.message);
        return throwError(() => error.message);
    }
}