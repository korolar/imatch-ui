import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import { AppRoutingModule } from '../app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import {User} from '../calendar/day-view-scheduler.component';
import {parseISO} from 'date-fns';
import {CalendarEvent, CalendarView} from 'angular-calendar';

@Component({
  selector: 'app-board-trainer',
  templateUrl: './board-trainer.component.html',
  styleUrls: ['./board-trainer.component.css']
})
export class BoardTrainerComponent implements OnInit {
  content: any;
  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(private userService: UserService,  private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    const user = this.tokenStorage.getUser();
    this.userService.getTrainerBoard(user.id).subscribe(
      data => {
        this.content = JSON.parse(data);
        this.mapFromSchedulesToEvents(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  public mapFromSchedulesToEvents(schedule: any[]): void {
    schedule.forEach(value => this.mapFromScheduleToEvent(value));
  }

  private mapFromScheduleToEvent(schedule: any): void {
    this.events.push({
      title: '@' + schedule.club + ' value ' + schedule.value + 'kn' + ' ' + this.getAllPlayersAsString(schedule.players),
      start: parseISO(schedule.beginning),
      end: parseISO(schedule.end),
    });
  }

  private getAllPlayersAsString(players: any[]): string {

    // tslint:disable-next-line:prefer-const
    let playerString = '';
    players.forEach(player => {
          playerString = playerString + player.firstName + ' ' + player.lastName + ' ';
        }
    );
    return playerString;
  }
}
