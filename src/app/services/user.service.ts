import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError, tap } from 'rxjs';
import { ErrorService } from "./error.service";
import { IUser } from "../store/models/user";
import { Update } from "@ngrx/entity";
import { IQuiz } from "../store/models/quiz";

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

    getOne(id: number): Observable<IUser> {
        return this.http.get<IUser>(`http://localhost:3000/user/${id}`);
    }

    update(update: Update<IQuiz>): Observable<IUser> {
        return this.http.patch<IUser>(`http://localhost:3000/user/${update.id}`, update.changes);
    }

    uploadAvatar(userId: number | undefined, file: any): Observable<any> {
        return this.http.post<any>(`http://localhost:3000/user/avatar/${userId}`, file);
    }

    private errorHandler(error: HttpErrorResponse) { // todo метод повторяется (in question.service), полумать как уйти от этого
        this.errorService.handle(error.message);
        return throwError(() => error.message);
    }
}