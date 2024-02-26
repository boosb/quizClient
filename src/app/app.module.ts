import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './components/admin-side-components/quiz-components/quiz/quiz.component';
import { GlobalErrorComponent } from "./components/common-components/global-error/global-error.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterQuestionPipe } from './pipes/filter-question.pipe';
import { ModalComponent } from './components/common-components/modal/modal.component';
import { CreateQuestionComponent } from './components/admin-side-components/question-components/create-question/create-question.component';
import { FocusDirective } from './directives/focus.directive';
import { QuizzesPageComponent } from './pages/quizzes-page/quizzes-page.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RatingPageComponent } from './pages/rating-page/rating-page.component';
import { UserComponent } from './components/user/user.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NotificationComponent } from './components/common-components/notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminMenuComponent } from './components/admin-side-components/admin-menu/admin-menu.component';
import { AdminMenuItemComponent } from './components/admin-side-components/admin-menu-item/admin-menu-item.component';
import { CreateAnswerComponent } from './components/admin-side-components/answer-components/create-answer/create-answer.component';
import { QuestionComponent } from './components/admin-side-components/question-components/question/question.component';
import { FilterQuizzesPipe } from './pipes/filter-quizzes.pipe';
import { AnswerComponent } from './components/admin-side-components/answer-components/answer/answer.component';
import { EditQuestionComponent } from './components/admin-side-components/question-components/edit-question/edit-question.component';
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

@NgModule({
    declarations: [
        AppComponent, 
        QuizComponent, 
        GlobalErrorComponent,
        ModalComponent,
        CreateQuestionComponent,
        FilterQuestionPipe,
        FilterQuizzesPipe,
        FocusDirective,
        QuizzesPageComponent,
        InfoPageComponent,
        NavigationComponent,
        RatingPageComponent,
        UserComponent,
        AuthPageComponent,
        NotificationComponent,
        AdminMenuComponent,
        AdminMenuItemComponent,
        CreateAnswerComponent,
        QuestionComponent,
        AnswerComponent,
        EditQuestionComponent,
        ConfirmComponent,
        QuizPageComponent
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
        })
    ],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        // RouterOutlet,
        // RouterLink,
        RouterModule.forRoot([
            {path: '', component: QuizzesPageComponent},
            {path: 'info', component: InfoPageComponent},
            {path: 'rating', component: RatingPageComponent},
            {path: 'auth', component: AuthPageComponent},
            {path: 'quizzes/create', component: QuizPageComponent},
            {path: 'quizzes/edit/:id', component: QuizPageComponent},
            {path: 'quizzes', component: QuizzesPageComponent}
        ]),
        HttpClientModule, // todo а этот модуль я не нашел как подключить иначе, кроме как в ngModule
        BrowserModule, // todo проблема запуска была в этом
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers),
        StoreModule.forFeature('quiz', quizzesReducer),
        StoreModule.forFeature('router', routerReducer),
        EffectsModule.forRoot([
            QuizzesEffects,
            QuestionsEffects,
            
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