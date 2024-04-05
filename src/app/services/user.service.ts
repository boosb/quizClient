import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { IUser } from "../store/models/user";
import { Update } from "@ngrx/entity";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
    ) {}

    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>('http://localhost:3000/user/all');
    }

    getOne(id: number | undefined): Observable<IUser> {
        return this.http.get<IUser>(`http://localhost:3000/user/${id}`);
    }

    update(update: Update<IUser>): Observable<IUser> {
        return this.http.patch<IUser>(`http://localhost:3000/user/${update.id}`, update.changes);
    }

    updateEmail(update: Update<IUser>): Observable<IUser> {
        return this.http.patch<IUser>(`http://localhost:3000/user/confirm-email/${update.id}`, update.changes);
    }

    uploadAvatar(userId: number | undefined, file: any): Observable<any> {
        return this.http.post(`http://localhost:3000/files/avatar/${userId}`, file);
    }
}