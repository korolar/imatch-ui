import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {DayViewSchedulerComponent} from './calendar/day-view-scheduler.component';
import {ContextMenuModule} from 'ngx-contextmenu';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@danielmoncada/angular-datetime-picker';
import {NgSelectModule} from '@ng-select/ng-select';

import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {FilterPipe} from './pipes/filter.pipe';
import {CalendarHeaderComponent} from './calendar/calendar-header.components';
import {AddscheduleComponent} from './addschedule/addschedule.component';
import { AddpackageComponent } from './addpackage/addpackage.component';
import {DatePipe} from '@angular/common';
import { InfoplayersComponent } from './infoplayers/infoplayers.component';
import {MatTableModule } from '@angular/material/table';

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
        DayViewSchedulerComponent,
        AddscheduleComponent,
        AddpackageComponent,
        InfoplayersComponent,
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
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgSelectModule,
        MatTableModule,
    ],
    providers: [authInterceptorProviders, DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
