import { Pipe, PipeTransform } from '@angular/core';
import { IQuiz } from '../store/models/quiz';

@Pipe({
  name: 'filterQuizzes'
})
export class FilterQuizzesPipe implements PipeTransform {

  transform(quiz: (IQuiz | undefined)[] | null, search: string): (IQuiz | undefined)[] | null {
    const value = quiz ? quiz.filter(quiz => quiz?.name.toLowerCase().includes(search.toLowerCase())) : null;
    return search.length === 0 ? quiz : value;
  }
}