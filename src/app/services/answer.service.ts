import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { IAnswer } from '../store/models/answer';

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
    }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  create(answer: IAnswer): Observable<IAnswer> {
    return this.http.post<IAnswer>(`http://localhost:3000/answers`, answer)
      .pipe(
        tap(answer => {
          this.newAnswer$.next(answer);
        })
      );
  }

  update(id: number, answer: IAnswer) {
    
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
