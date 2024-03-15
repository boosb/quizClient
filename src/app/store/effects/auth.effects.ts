import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { confirmEmail, confirmEmailSuccess, login, loginError, loginSuccess, registration, registrationSuccess, updateUser, updateUserSuccess } from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    exhaustMap((action) => this.authService.login(action.user)
      .pipe(
        map(authUser => {
          this.router.navigateByUrl('/');
          return loginSuccess({user: authUser});
        }),
        catchError((err) => of(loginError({errorText: err.error.message})))
      ))
    )
  );

  registration$ = createEffect(() => this.actions$.pipe(
    ofType(registration),
    exhaustMap((action) => this.authService.registration(action.user)
      .pipe(
        map((data: any) => {
          this.router.navigateByUrl('/');
          return registrationSuccess({user: data.user});
        }),
        catchError((error) => EMPTY) // todo После обеда добавлю сюда обработку ошибки существования пользователя
      ))
    )
  );

  confirmEmail$ = createEffect(() => this.actions$.pipe(
    ofType(confirmEmail),
    exhaustMap((action) => this.authService.confirmEmail(action.urlParams)
      .pipe(
        map((user: IUser) => {
          this.router.navigateByUrl('/profile');
          return confirmEmailSuccess({ user });
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  // todo ваще хз, скорей всего лучше вынести работу с пользваками в отдельный логический блок.
  // но тут есть нюансы: 1) если я владелец, возможно мне нужно видеть всех пользаков, чтобы именть возможность забанить (например)
  // 2) но если я обычный юзер, то мне нельзя владеть такой инфой 
  // 3) получается нужен какой-то гуард или какая-то логика, чтобы определать поведение редьюсера в зависимости от роли
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    exhaustMap((action) => {
      this.userServise.update(action.update).subscribe();
      return this.userServise.getOne(Number(action.update.id))
        .pipe(
          map((updatedUser) => {
            this.notificationService.show(`Your profile has been successfully updated!`);
            return updateUserSuccess({ updatedUser });
          }),
          catchError(() => EMPTY)
        )
    })
  )
  );
 
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userServise: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}