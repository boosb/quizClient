import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/user';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: IUser[], search: string): IUser[] {

    return search.length === 0 ? users : users.filter(user => user.title.toLowerCase().includes(search.toLowerCase()));
  }

}
