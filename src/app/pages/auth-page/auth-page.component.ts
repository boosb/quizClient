import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { login, registration } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

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
