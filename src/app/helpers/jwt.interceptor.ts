import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { selectUser } from '../store/selectors/auth.selectors';

//todo ПОразбираться, чет ваще непонятный файл, но чет с авторизацией связано как будто
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private store: Store<AppState>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.pipe(select(selectUser)).subscribe(currentUser => {
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
            }
        })

        return next.handle(request);
    }
}