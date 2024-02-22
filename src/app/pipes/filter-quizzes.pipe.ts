import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../store/models/question';
import { IQuiz } from '../store/models/quiz';

@Pipe({
  name: 'filterQuizzes'
})
export class FilterQuizzesPipe implements PipeTransform {

  transform(quiz: IQuiz[], search: string): IQuiz[] {
    return search.length === 0 
      ? quiz 
      : quiz.filter(quiz => quiz.name.toLowerCase().includes(search.toLowerCase()));
  }
}