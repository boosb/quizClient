import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, catchError, throwError, retry, tap, Subject } from 'rxjs';
import { IQuestion } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  currentQuestion$ = new Subject<IQuestion>();

  lastCreatedQuestion$ = new Subject<IQuestion>();

  lastDeletedQuestionId$ = new Subject<number | undefined>();
  
  setCurrentQuestion(question: IQuestion) {
    this.currentQuestion$.next(question);
  }
  
  getAll(quizId: number | undefined): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`http://localhost:3000/question`, {
        params: new HttpParams({
            fromObject: {
              quizid: quizId || -1
            }
        })
    }).pipe(
        catchError(this.errorHandler.bind(this))
    );
  }

  getOne(questionId: number | undefined): Observable<IQuestion> {
    return this.http.get<IQuestion>(`http://localhost:3000/question/${questionId}`);
  }

  create(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(`http://localhost:3000/question`, question)
      .pipe(
        tap((createdQuestion) => {
          this.lastCreatedQuestion$.next(createdQuestion);
        })
      );
  }

  update(questionId: number | undefined, question: IQuestion): Observable<IQuestion> {
    return this.http.patch<IQuestion>(`http://localhost:3000/question/${questionId}`, question)
      .pipe(
        tap(() => {
          this.getOne(questionId).subscribe((updatedQuestion) => {
            this.currentQuestion$.next(updatedQuestion);
          });
        })
      );
  }

  delete(questionId: number | undefined): Observable<IQuestion> {
    return this.http.delete<IQuestion>(`http://localhost:3000/question/${questionId}`)
      .pipe(
        tap(() => {
          console.log(questionId, ' >>> deletedQuestion-test-0')
          this.lastDeletedQuestionId$.next(questionId);
        })
      );
  }

  private errorHandler(error: HttpErrorResponse) {
      this.errorService.handle(error.message);
      return throwError(() => error.message);
  }
}
