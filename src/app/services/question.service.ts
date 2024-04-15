import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from '../store/models/question';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private http: HttpClient,
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

  sortQuestions(questions: IQuestion[] | undefined) {
    if(!questions || !questions.length) {
        return;
    }

    const sortedQuestions = questions.slice();
    sortedQuestions.sort((a: IQuestion, b: IQuestion) => {
        if (!a.id || !b.id) {
            return 0;
        }
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    });

    return sortedQuestions;
  }
}
