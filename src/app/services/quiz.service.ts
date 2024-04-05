import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuiz } from '../store/models/quiz';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(
    private http: HttpClient,
  ) {}

  getOne(quizId: number | undefined): Observable<IQuiz> { // todo а мне вот этот метод нужен, если я и так при загрузке все квизы получаю?
    return this.http.get<IQuiz>(`http://localhost:3000/quizzes/${quizId}`);
  }
  
  getAll(): Observable<IQuiz[]> {
    return this.http.get<IQuiz[]>('http://localhost:3000/quizzes');
  }

  create(quiz: IQuiz): Observable<IQuiz> {
    return this.http.post<IQuiz>('http://localhost:3000/quizzes', {
      name: quiz.name,
      complexity: quiz.complexity,
      questions: quiz.questions
    });
  }

  update(quiz: Update<IQuiz>): Observable<IQuiz> {
    return this.http.patch<IQuiz>(`http://localhost:3000/quizzes/${quiz.id}`, {
      name: quiz ? quiz.changes.name : '',
      complexity: quiz ? quiz.changes.complexity : ''
    });
  }

  delete(quizId: number | undefined): Observable<IQuiz> {
    return this.http.delete<IQuiz>(`http://localhost:3000/quizzes/${quizId}`);
  }
}
