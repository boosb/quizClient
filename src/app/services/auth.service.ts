import { Injectable } from '@angular/core';
import { IUser } from '../store/models/user';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IConfirmationData } from '../store/models/confirmationData';

export interface User {
  token: string
  id?: number
  email?: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser|null>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser|null>(JSON.parse(String(localStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable(); // todo а оно, вот это вот все, нужно мне вообще? 
  }

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

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/auth/login', user);
  }

  registration(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/user', user);
  }

  confirmEmail(confirmationData: IConfirmationData): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/auth/confirm', confirmationData);
  }
}