import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IHistoryQuizzes } from "../store/models/history-quizzes";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HistoryQuizzesService {
  
    constructor(
      private http: HttpClient
    ) {
    }

    create(hystory: IHistoryQuizzes): Observable<IHistoryQuizzes> {
        console.log('hello-1')
        return this.http.post<IHistoryQuizzes>(`http://localhost:3000/history-quizzes`, hystory);
    }
}