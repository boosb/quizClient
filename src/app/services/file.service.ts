import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(
        private http: HttpClient,
    ) {}

    uploadUserAvatar(userId: number | undefined, file: any): Observable<any> {
        return this.http.post(`http://localhost:3000/files/avatar/${userId}`, file);
    }

    uploadImgQuestion(file: any): Observable<any> {
        return this.http.post(`http://localhost:3000/files/questions`, file);  
    }
}