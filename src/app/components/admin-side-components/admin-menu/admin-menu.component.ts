import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, selectMenuIsShow } from '../../../store';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { logout } from '../../../store/actions/auth.actions';
import { Router } from '@angular/router';
import { closeMenu } from '../../../store/actions/menu.action';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent {

  public isShow$: Observable<boolean> = this.store.select(selectMenuIsShow);

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  logout() {
    this.router.navigateByUrl('/auth');
    this.store.dispatch(closeMenu());
    this.store.dispatch(logout());
  }
}
