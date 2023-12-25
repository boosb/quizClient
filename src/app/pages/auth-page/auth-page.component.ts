import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  constructor(
    public authService: AuthService,
    private router: Router
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
    this.authService.login({
      email: this.authForm.value.email as string,
      password: this.authForm.value.password as string
    }).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  registration() {
    this.authService.registration({
      email: this.authForm.value.email as string,
      password: this.authForm.value.password as string
    }).subscribe(() => {
    });
  }

  animateButton(event: any) {
    event.preventDefault;
    event.target.classList.remove('animate');
    event.target.classList.add('animate');

    setTimeout(() => {
      event.target.classList.remove('animate');
    }, 700);
  }
}
