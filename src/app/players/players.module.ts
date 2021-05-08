import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayersRoutingModule} from './players-routing.module';
import {InfoplayersComponent} from './infoplayers/infoplayers.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PlayerComponent} from './player/player.component';

@NgModule({
    declarations: [
        InfoplayersComponent,
        PlayerComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatPaginatorModule,
        PlayersRoutingModule,
    ]
})
export class PlayersModule {
}
