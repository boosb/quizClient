import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, catchError, throwError, retry, tap, Subject } from 'rxjs';
import { IQuestion } from '../store/models/question';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }
  
  getAll(quizId: number | undefined): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`http://localhost:3000/question`, {
        params: new HttpParams({
            fromObject: {
              quizid: quizId || -1
            }
        })
    });
  }

  getOne(questionId: number | undefined): Observable<IQuestion> {
    return this.http.get<IQuestion>(`http://localhost:3000/question/${questionId}`);
  }

  create(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(`http://localhost:3000/question`, question);
  }

  update(question: Update<IQuestion>): Observable<IQuestion> {
    return this.http.patch<IQuestion>(`http://localhost:3000/question/${question.id}`, question.changes)
  }

  delete(questionId: number | undefined): Observable<IQuestion> {
    return this.http.delete<IQuestion>(`http://localhost:3000/question/${questionId}`)
  }

  private errorHandler(error: HttpErrorResponse) { // todo убрать
      this.errorService.handle(error.message);
      return throwError(() => error.message);
  }
}
