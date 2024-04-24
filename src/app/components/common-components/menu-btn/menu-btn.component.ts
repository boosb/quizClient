import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectMenuIsShow } from '../../../store';
import { Observable, Subscription } from 'rxjs';
import { toggleMenu } from '../../../store/actions/menu.action';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { IUser } from '../../../store/models/user';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrl: './menu-btn.component.scss'
})
export class MenuBtnComponent {

  public isShow$: Observable<boolean> = this.store.select(selectMenuIsShow);

  public authUser$: Observable<IUser|null> = this.store.select(selectUser);

  constructor(
    private store: Store<AppState>
  ){}

  click() {
    this.store.dispatch(toggleMenu())
  }
}
