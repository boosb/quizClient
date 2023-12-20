import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { GlobalErrorComponent } from "./components/global-error/global-error.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterUsersPipe } from './pipes/filter-products.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FocusDirective } from './directives/focus.directive';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RatingPageComponent } from './pages/rating-page/rating-page.component';

@NgModule({
    declarations: [
        AppComponent, 
        UserComponent, 
        GlobalErrorComponent,
        ModalComponent,
        CreateUserComponent,
        FilterUsersPipe,
        FocusDirective,
        UserPageComponent,
        InfoPageComponent,
        NavigationComponent,
        RatingPageComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
      //  RouterOutlet,
        //RouterLink,
        RouterModule.forRoot([
            {path: '', component: UserPageComponent},
            {path: 'info', component: InfoPageComponent},
            {path: 'rating', component: RatingPageComponent}
        ]),
        HttpClientModule, // todo а этот модуль я не нашел как подключить иначе, кроме как в ngModule
        BrowserModule, // todo проблема запуска была в этом
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule {}