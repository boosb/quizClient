import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, catchError, throwError, retry, tap } from 'rxjs';
import { IQuestion } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  questions: IQuestion[] = [];
  
  getAll(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>('https://fakestoreapi.com/products', {
        params: new HttpParams({
            fromObject: {limit: 5}
        })
    }).pipe(
        retry(2),
        tap((questions: IQuestion[]) => {
            this.questions = questions;
        }),
        catchError(this.errorHandler.bind(this))
    );
  }

  create(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>('https://fakestoreapi.com/products', question)
        .pipe(
            tap(question => this.questions.push(question))
        );
  }

  private errorHandler(error: HttpErrorResponse) {
      this.errorService.handle(error.message);
      return throwError(() => error.message);
  }
}
