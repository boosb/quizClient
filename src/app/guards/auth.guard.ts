import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { IUser } from '../store/models/user';
import { Subscription } from 'rxjs';
import { selectUser } from '../store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, OnDestroy {

    private currentUserSubs: Subscription

    private currentUser: IUser | null

    constructor(
        private router: Router,
        private store: Store<AppState>
    ) {
        this.currentUserSubs = this.store.pipe(select(selectUser)).subscribe(currentUser => this.currentUser = currentUser)
    }
    
    ngOnDestroy(): void {
        this.currentUserSubs.unsubscribe()
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const cond = this.currentUser && this.currentUser.isEmailConfirmed;
        if(!cond) {
            this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } })
        }
        return !!cond;
    }
}