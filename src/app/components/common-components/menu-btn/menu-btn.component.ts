import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectMenuIsShow } from '../../../store';
import { Observable, Subscription } from 'rxjs';
import { toggleMenu } from '../../../store/actions/menu.action';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrl: './menu-btn.component.scss'
})
export class MenuBtnComponent {

  public isShow$: Observable<boolean> = this.store.select(selectMenuIsShow)

  constructor(
    private store: Store<AppState>
  ){}

  click() {
    this.store.dispatch(toggleMenu())
  }
}
