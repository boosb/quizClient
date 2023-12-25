import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  isLogin = true;

  toggleIsLogin() {
    if( this.isLogin ) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  swapLogIn() {
    this.isLogin = true;
  }

  swapSignIn() {
    this.isLogin = false;
  }

  login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/auth/login', user);
  }

  registration(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/user', user);
  }
}