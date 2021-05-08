import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InfoplayersComponent} from './infoplayers/infoplayers.component';
import {PlayerComponent} from './player/player.component';

const routes: Routes = [
    { path: 'infoplayers', component: InfoplayersComponent },
    {path: 'infoplayers/:id', component: PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
