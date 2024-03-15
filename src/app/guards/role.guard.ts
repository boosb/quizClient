import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { Subscription } from 'rxjs';
import { showConfirm } from '../store/actions/modal.actions';
import { selectUserRole } from '../store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate, OnDestroy {

    private roles = {
        USER: 'USER',
        ADMIN: 'ADMIN',
        OWNER: 'OWNER'
    }

    private currentRoleSubs: Subscription

    private currentRole: string | null

    constructor(
        private store: Store<AppState>,
    ) {
        this.currentRoleSubs = this.store.pipe(select(selectUserRole)).subscribe(currentRole => this.currentRole = currentRole)
    }

    ngOnDestroy(): void {
        this.currentRoleSubs.unsubscribe()
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        const paths = this._getPaths(route)
        const cond = paths.includes(state.url)

        if(!cond) {
            this.store.dispatch(showConfirm({ data: {
                text: 'You don\'t have enough rights',
                okCallback: () => {}
            }}))
        }

        return cond
    }

    _getPaths(route: ActivatedRouteSnapshot) {
        switch(this.currentRole) {
            case this.roles.USER:
                return []
            case this.roles.ADMIN: 
                return [
                    '/quizzes/create',
                    `/quizzes/edit/${route.params.id}`
                ]
            case this.roles.OWNER: 
                return [
                    '/quizzes/create',
                    `/quizzes/edit/${route.params.id}`
                ]
            default:
                return []
        }
    }
}