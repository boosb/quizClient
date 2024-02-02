import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './components/quiz/quiz.component';
import { GlobalErrorComponent } from "./components/global-error/global-error.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterQuestionPipe } from './pipes/filter-question.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { FocusDirective } from './directives/focus.directive';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RatingPageComponent } from './pages/rating-page/rating-page.component';
import { UserComponent } from './components/user/user.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminMenuItemComponent } from './components/admin-menu-item/admin-menu-item.component';
import { CreateQuizPageComponent } from './pages/create-quiz-page/create-quiz-page.component';
import { CreateAnswerComponent } from './components/create-answer/create-answer.component';
import { QuestionComponent } from './components/question/question.component';
import { FilterQuizzesPipe } from './pipes/filter-quizzes.pipe';
import { AnswerComponent } from './components/answer/answer.component';

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
        QuizPageComponent,
        InfoPageComponent,
        NavigationComponent,
        RatingPageComponent,
        UserComponent,
        AuthPageComponent,
        NotificationComponent,
        AdminMenuComponent,
        AdminMenuItemComponent,
        CreateQuizPageComponent,
        CreateAnswerComponent,
        QuestionComponent,
        AnswerComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        // RouterOutlet,
        // RouterLink,
        RouterModule.forRoot([
            {path: '', component: QuizPageComponent},
            {path: 'info', component: InfoPageComponent},
            {path: 'rating', component: RatingPageComponent},
            {path: 'auth', component: AuthPageComponent},
            {path: 'quizzes/create', component: CreateQuizPageComponent},
            {path: 'quizzes/edit', component: CreateQuizPageComponent},
            {path: 'quizzes', component: QuizPageComponent}
        ]),
        HttpClientModule, // todo а этот модуль я не нашел как подключить иначе, кроме как в ngModule
        BrowserModule, // todo проблема запуска была в этом
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ]
})
export class AppModule {}