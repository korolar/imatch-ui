import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardOwnerComponent} from './board-admin/board-owner.component';
import {BoardTrainerComponent} from './board-moderator/board-trainer.component';
import {BoardPlayerComponent} from './board-user/board-player.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DayViewSchedulerComponent } from './calendar/day-view-scheduler.component';
import { ContextMenuModule } from 'ngx-contextmenu';

import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {FilterPipe} from './pipes/filter.pipe';
import { CalendarHeaderComponent } from './calendar/calendar-header.components';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProfileComponent,
        BoardOwnerComponent,
        BoardTrainerComponent,
        BoardPlayerComponent,
        FilterPipe,
        CalendarHeaderComponent,
        DayViewSchedulerComponent
    ],
    exports: [CalendarHeaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        ContextMenuModule.forRoot({
            useBootstrap4: true,
        }),
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
