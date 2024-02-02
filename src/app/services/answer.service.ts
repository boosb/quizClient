import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IAnswer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  answers: IAnswer[] = [];

  getAll(questionId: number | undefined): Observable<IAnswer[]> {
    return this.http.get<IAnswer[]>(`http://localhost:3000/answers`, {
      params: new HttpParams({
        fromObject: {
          questionid: questionId || -1
        }
      })
    }).pipe(
      tap((answers: IAnswer[]) => {
        this.answers = answers;
        console.log( this.answers, ' >>> this.answers' )
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  create(answer: IAnswer): Observable<IAnswer> {
    console.log( answer, ' >>> answer!' )
    return this.http.post<IAnswer>(`http://localhost:3000/answers`, answer)
        .pipe(
            tap(answer => this.answers.push(answer))
        );
  }

  private errorHandler(error: HttpErrorResponse) {
      this.errorService.handle(error.message);
      return throwError(() => error.message);
  }
}
