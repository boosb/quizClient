import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { login, registration } from '../../store/actions/auth.actions';
import { selectError, selectUser } from '../../store/selectors/auth.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnDestroy {

  confirmEmailSubs: Subscription;

  errorTextSubs: Subscription;

  isShowConfirmInfo: boolean | null;

  errorText: string | null;

  authForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  
  get email() {
    return this.authForm.controls.email as FormControl;
  }

  get password() {
    return this.authForm.controls.password as FormControl;
  }

  constructor(
    public authService: AuthService,
    private store: Store<AppState>
  ) {
    this.confirmEmailSubs = this.store.pipe(select(selectUser)).subscribe(user => {
      this.isShowConfirmInfo = user && !user.isEmailConfirmed;
    });

    this.errorTextSubs = this.store.pipe(select(selectError)).subscribe(errorText => this.errorText = errorText);
  }

  ngOnDestroy(): void {
    this.confirmEmailSubs.unsubscribe();
    this.errorTextSubs.unsubscribe();
  }

  submit() {
    this.authService.isLogin ? this.login() : this.registration();
  }

  login() {
    this.store.dispatch(login({
      user: {
        email: this.authForm.value.email as string,
        password: this.authForm.value.password as string
      }
    }))
  }

  registration() {
    this.store.dispatch(registration({
      user: {
        email: this.authForm.value.email as string,
        password: this.authForm.value.password as string,
        roleId: 1
      }
    }))
  }

  animateButton(event: any) { // todo убрать в helper
    event.preventDefault;
    event.target.classList.remove('animate');
    event.target.classList.add('animate');

    setTimeout(() => {
      event.target.classList.remove('animate');
    }, 700);
  }
}
