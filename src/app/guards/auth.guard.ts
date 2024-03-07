import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectUser } from '../store';
import { IUser } from '../store/models/user';
import { Subscription } from 'rxjs';

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
        console.log(this.currentUser, ' >>> this.currentUser')    
        if(!this.currentUser) {
            this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } })
        }
        return this.currentUser ? true : false
    }
}