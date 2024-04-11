import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../../services/user.service";
import { loadUsers, loadUsersSuccess } from "../actions/users.actions";

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() => this.usersService.getAllUsers()
      .pipe(
        map((users) => loadUsersSuccess({users})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UserService,
  ) {}
}