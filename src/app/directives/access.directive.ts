
import {
    Directive,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { Subscription } from 'rxjs';
import { selectUserRole } from '../store/selectors/auth.selectors';

@Directive({ 
    selector: '[appRoleAccess]' 
})
export class AccessDirective implements OnDestroy {
    private hasView = false;

    private roleSubs: Subscription;

    private currentRole: string | null;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private store: Store<AppState>
    ) {
        this.roleSubs =  this.store.pipe(select(selectUserRole)).subscribe(role => this.currentRole = role);
    }

    ngOnDestroy(): void {
        this.roleSubs.unsubscribe();
    }

    @Input() set appRoleAccess(rightRoles: (string|null)[]) {
        const isAccess = rightRoles.includes(this.currentRole);

        if (!isAccess && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        } else if (isAccess && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
    }
}