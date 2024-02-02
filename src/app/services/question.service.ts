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
  currentQuestion: IQuestion | null = null;
  
  setCurrentQuestion(questionId: number | undefined): Observable<IQuestion> {
    return this.http.get<IQuestion>(`http://localhost:3000/question/${questionId}`)
      .pipe(
        tap((question: IQuestion) => {
          this.currentQuestion = question;
          console.log( this.currentQuestion, ' >>> this.currentQuestion' )
        })
      );
  }
  
  getAll(quizId: number | undefined): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`http://localhost:3000/question`, {
        params: new HttpParams({
            fromObject: {
              quizid: quizId || -1
            }
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
    return this.http.post<IQuestion>(`http://localhost:3000/question`, question) // todo ID скорее всего должен меняться
      .pipe(
        tap(question => {
          this.currentQuestion = question;
          this.questions.push(question);
        })
      );
  }

  delete(questionId: number | undefined) {
    return this.http.delete<IQuestion>(`http://localhost:3000/question/${questionId}`)
      .pipe(
        tap(() => {
          this.questions = this.questions.filter(question => question.id !== questionId);
        })
      );
  }

  private errorHandler(error: HttpErrorResponse) {
      this.errorService.handle(error.message);
      return throwError(() => error.message);
  }
}
