import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { IQuiz } from '../models/quiz';
import { Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
  ) {}
  
  quizzes: IQuiz[] = [];

  getOne(quizId: number | undefined): Observable<IQuiz> {
    return this.http.get<IQuiz>(`http://localhost:3000/quizzes/${quizId}`);
  }
  
  getAll(): Observable<IQuiz[]> {
    return this.http.get<IQuiz[]>('http://localhost:3000/quizzes')
      .pipe(
          tap((quizzes: IQuiz[]) => {
            this.quizzes = quizzes;
          }),
          catchError(this.errorHandler.bind(this))
      );
  }

  create(quiz: IQuiz): Observable<IQuiz> {
    return this.http.post<IQuiz>('http://localhost:3000/quizzes', {
      name: quiz.name,
      complexity: quiz.complexity
    }).pipe(
      tap(quiz => {
        this.quizzes.push(quiz);
      })
    );
  }

  update(quizId: number | undefined, quiz: IQuiz): Observable<IQuiz> {
    return this.http.patch<IQuiz>(`http://localhost:3000/quizzes/${quizId}`, {
      name: quiz ? quiz.name : '',
      complexity: quiz ? quiz.complexity : ''
    });
  }

  delete(quizId: number | undefined): Observable<IQuiz> {
    return this.http.delete<IQuiz>(`http://localhost:3000/quizzes/${quizId}`)
      .pipe(
        tap(() => {
          this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId);
        })
      );
  }

  private errorHandler(error: HttpErrorResponse) {
      this.errorService.handle(error.message);
      return throwError(() => error.message);
  }
}
