import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { login, loginSuccess, logout, logoutSuccess, registration, registrationSuccess } from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    exhaustMap((action) => this.authService.login(action.user)
      .pipe(
        map(authUser => {
          console.log(authUser, ' >>> authUser')
          this.router.navigateByUrl('/')
          return loginSuccess({user: authUser})
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  registration$ = createEffect(() => this.actions$.pipe(
    ofType(registration),
    exhaustMap((action) => this.authService.registration(action.user)
      .pipe(
        map((data: any) => {
          console.log(data, ' >>> data')
          this.router.navigateByUrl('/')
          return registrationSuccess({user: data.user})
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}