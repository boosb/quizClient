import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { IAnswer } from '../store/models/answer';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  public newAnswer$ = new Subject<IAnswer>;

  getAll(questionId: number | undefined): Observable<IAnswer[]> {
    return this.http.get<IAnswer[]>(`http://localhost:3000/answers`, {
      params: new HttpParams({
        fromObject: {
          questionid: questionId || -1
        }
      })
    })
  }

  getAllAtQuiz(quizId: number | undefined): Observable<IAnswer[]> {
    return this.http.get<IAnswer[]>(`http://localhost:3000/answers`, {
      params: new HttpParams({
        fromObject: {
          quizId: quizId || -1
        }
      })
    })
  }

  create(answer: IAnswer): Observable<IAnswer> {
    return this.http.post<IAnswer>(`http://localhost:3000/answers`, answer)
  }

  delete(answerId: number | undefined): Observable<IAnswer> {
    return this.http.delete<IAnswer>(`http://localhost:3000/answers/${answerId}`)
  }

  update(answer: Update<IAnswer>): Observable<IAnswer> {
    return this.http.patch<IAnswer>(`http://localhost:3000/answers/${answer.id}`, answer.changes)
  }

  private errorHandler(error: HttpErrorResponse) { // todo вынести все это из сервисов
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
