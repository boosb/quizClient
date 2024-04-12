import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './components/admin-side-components/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterQuestionPipe } from './pipes/filter-question.pipe';
import { ModalComponent } from './components/common-components/modal/modal.component';
import { FocusDirective } from './directives/focus.directive';
import { QuizzesPageComponent } from './pages/quizzes-page/quizzes-page.component';
import { RatingPageComponent } from './pages/rating-page/rating-page.component';
import { UserComponent } from './components/user/user.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NotificationComponent } from './components/common-components/notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminMenuComponent } from './components/admin-side-components/admin-menu/admin-menu.component';
import { AdminMenuItemComponent } from './components/admin-side-components/admin-menu-item/admin-menu-item.component';
import { QuestionComponent } from './components/admin-side-components/question/question.component';
import { FilterQuizzesPipe } from './pipes/filter-quizzes.pipe';
import { AnswerComponent } from './components/admin-side-components/answer/answer.component';
import { ConfirmComponent } from './components/common-components/confirm/confirm.component';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuizzesEffects } from './store/effects/quizzes.effects';
import { reducers } from './store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { CustomSerializer } from './store/custom-route-serializer';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { QuestionsEffects } from './store/effects/questions.effects';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { quizzesReducer } from './store/reducers/quizzes.reducer';
import { qustionsReducer } from './store/reducers/questions.reducer';
import { answersReducer } from './store/reducers/answers.reducer';
import { AnswersEffects } from './store/effects/answers.effects';
import { QuestionModalComponent } from './components/admin-side-components/question-modal/question-modal.component';
import { MenuBtnComponent } from './components/common-components/menu-btn/menu-btn.component';
import { menuReducer } from './store/reducers/menu.reducer';
import { modalReducer } from './store/reducers/modal.reducer';
import { AnswerModalComponent } from './components/admin-side-components/answer-modal/answer-modal.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { RoleGuard } from './guards/role.guard';
import { AccessDirective } from './directives/access.directive';
import { ConfirmEmailPageComponent } from './pages/confirm-email-page/confirm-email-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { QuizGameComponent } from './pages/quiz-game/quiz-game.component';
import { gameReducer } from './store/reducers/quiz-game.reducer';
import { GameEffects } from './store/effects/quiz-game.effects';
import { GameStatisticComponent } from './components/game-statistic/game-statistic.component';
import { usersReducer } from './store/reducers/users.reducer';
import { UsersEffects } from './store/effects/users.effects';
import {MatPaginatorModule} from '@angular/material/paginator';
import { filesReducer } from './store/reducers/files.reducer';
import { FilesEffects } from './store/effects/files.effects';
import {MatCardModule} from '@angular/material/card';
import { CutQuestionPipe } from './pipes/cut-question.pipe';

@NgModule({
    declarations: [
        AppComponent, 
        QuizComponent, 
        ModalComponent,
        FilterQuestionPipe,
        FilterQuizzesPipe,
        CutQuestionPipe,
        FocusDirective,
        AccessDirective,
        QuizzesPageComponent,
        RatingPageComponent,
        UserComponent,
        AuthPageComponent,
        NotificationComponent,
        AdminMenuComponent,
        AdminMenuItemComponent,
        QuestionComponent,
        AnswerComponent,
        ConfirmComponent,
        QuizPageComponent,
        QuestionModalComponent,
        MenuBtnComponent,
        AnswerModalComponent,
        ConfirmEmailPageComponent,
        ProfilePageComponent,
        QuizGameComponent,
        GameStatisticComponent,
    ],
    providers: [
        provideStore(),
        provideStoreDevtools({
          maxAge: 25, // Retains last 25 states
          logOnly: !isDevMode(), // Restrict extension to log-only mode
          autoPause: true, // Pauses recording actions and state changes when the extension window is not open
          trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
          traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
          connectInZone: true // If set to true, the connection is established within the Angular zone
        }),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        // RouterOutlet,
        // RouterLink,
        RouterModule.forRoot([
            {path: '', component: QuizzesPageComponent, canActivate: [AuthGuard]},
            {path: 'rating', component: RatingPageComponent, canActivate: [AuthGuard]},
            {path: 'auth', component: AuthPageComponent},
            {path: 'quizzes/create', component: QuizPageComponent, canActivate: [AuthGuard, RoleGuard]},
            {path: 'quizzes/edit/:id', component: QuizPageComponent, canActivate: [AuthGuard, RoleGuard]},
            {path: 'confirm', component: ConfirmEmailPageComponent},
            {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
            {path: 'quizzes/:id', component: QuizGameComponent, canActivate: [AuthGuard]},
            // todo настроить компонент и маршрут PageNotFoundComponent с **
        ]),
        HttpClientModule, // todo а этот модуль я не нашел как подключить иначе, кроме как в ngModule
        BrowserModule, // todo проблема запуска была в этом
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatButton,
        MatTooltip,
        MatIconModule,
        MatButtonModule, 
        MatDividerModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatPaginatorModule,
        MatCardModule,
        StoreModule.forRoot(reducers),
        StoreModule.forFeature('quizzes', quizzesReducer), // todo почитать, мб можно это организовать покрасивее
        StoreModule.forFeature('router', routerReducer),
        StoreModule.forFeature('questions', qustionsReducer),
        StoreModule.forFeature('answers', answersReducer),
        StoreModule.forFeature('menu', menuReducer),
        StoreModule.forFeature('modal', modalReducer),
        StoreModule.forFeature('auth', authReducer),
        StoreModule.forFeature('game', gameReducer),
        StoreModule.forFeature('users', usersReducer),
        StoreModule.forFeature('files', filesReducer),
        EffectsModule.forRoot([
            QuizzesEffects,
            QuestionsEffects,
            AnswersEffects,
            AuthEffects,
            GameEffects,
            UsersEffects,
            FilesEffects
        ]),
        StoreRouterConnectingModule.forRoot({
           // serializer: CustomSerializer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectInZone: true // If set to true, the connection is established within the Angular zone
        }),
    ]
})
export class AppModule {}