import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, tap } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  title = 'quizClient';
  loading = false;
  term = '';
  users$: Observable<IUser[]> | undefined

  constructor(
    public userService: UserService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    /*this.users$ = this.userService.getAll().pipe(
      tap(() => this.loading = false)
    );*/
    this.userService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
