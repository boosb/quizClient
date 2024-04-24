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

    getAll(): Observable<IHistoryQuizzes> {
        return this.http.get<IHistoryQuizzes>(`http://localhost:3000/history-quizzes`);
    }

    create(historyQuizzes: IHistoryQuizzes): Observable<IHistoryQuizzes> {
        return this.http.post<IHistoryQuizzes>(`http://localhost:3000/history-quizzes`, historyQuizzes);
    }
}