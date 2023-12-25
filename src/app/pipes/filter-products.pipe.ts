import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../models/question';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(question: IQuestion[], search: string): IQuestion[] {

    return search.length === 0 
      ? question 
      : question.filter(question => question.title.toLowerCase().includes(search.toLowerCase()));
  }

}
