import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrl: './rating-page.component.scss'
})
export class RatingPageComponent implements OnInit {
  titlePage = 'Rating';
  users$: Observable<IUser[]> | undefined;

  constructor(
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(() => {});
  }
}
