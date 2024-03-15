import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
    toggleEmail$ = new BehaviorSubject<boolean>(false);

    toggleAlias$ = new BehaviorSubject<boolean>(false);

    constructor() {}

    switchEmail() {
        this.toggleEmail$.next(!this.toggleEmail$.value);
    }

    switchAlias() {
        this.toggleAlias$.next(!this.toggleAlias$.value);
    }
}
