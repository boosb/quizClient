import { Component, Input } from '@angular/core';
import { IUser } from '../../models/user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent {
    @Input() user: IUser | undefined;

    details: boolean = false;
}