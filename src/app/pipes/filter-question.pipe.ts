import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../models/question';

@Pipe({
  name: 'filterQuestions'
})
export class FilterQuestionPipe implements PipeTransform {

  transform(question: IQuestion[], search: string): IQuestion[] {
    return search.length === 0 
      ? question 
      : question.filter(question => question.text.toLowerCase().includes(search.toLowerCase()));
  }
}
