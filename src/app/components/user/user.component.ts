import { Component, Input } from '@angular/core';
import { IUser } from '../../store/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user: IUser | undefined;
}
