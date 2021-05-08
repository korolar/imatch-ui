import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardPlayerComponent} from './board-user/board-player.component';
import {BoardTrainerComponent} from './board-moderator/board-trainer.component';
import {BoardOwnerComponent} from './board-admin/board-owner.component';
import {AddscheduleComponent} from './addschedule/addschedule.component';
import {AddpackageComponent} from './addpackage/addpackage.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PlayersRoutingModule} from './players/players-routing.module';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'user', component: BoardPlayerComponent},
    {path: 'mod', component: BoardTrainerComponent},
    {path: 'admin', component: BoardOwnerComponent},
    {path: 'addschedule', component: AddscheduleComponent},
    {path: 'addpackage', component: AddpackageComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes), PlayersRoutingModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
