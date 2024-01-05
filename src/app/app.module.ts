import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './components/quiz/quiz.component';
import { GlobalErrorComponent } from "./components/global-error/global-error.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterUsersPipe } from './pipes/filter-products.pipe';
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

@NgModule({
    declarations: [
        AppComponent, 
        QuizComponent, 
        GlobalErrorComponent,
        ModalComponent,
        CreateQuestionComponent,
        FilterUsersPipe,
        FocusDirective,
        QuizPageComponent,
        InfoPageComponent,
        NavigationComponent,
        RatingPageComponent,
        UserComponent,
        AuthPageComponent,
        NotificationComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
      //  RouterOutlet,
        //RouterLink,
        RouterModule.forRoot([
            {path: '', component: QuizPageComponent},
            {path: 'info', component: InfoPageComponent},
            {path: 'rating', component: RatingPageComponent},
            {path: 'auth', component: AuthPageComponent}
        ]),
        HttpClientModule, // todo а этот модуль я не нашел как подключить иначе, кроме как в ngModule
        BrowserModule, // todo проблема запуска была в этом
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ]
})
export class AppModule {}