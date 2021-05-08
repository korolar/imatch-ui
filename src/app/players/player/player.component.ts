import { Component, OnInit } from '@angular/core';
import {Owner} from '../infoplayers/infoplayers.component';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../_services/user.service';
import {switchMap} from 'rxjs/operators';
import {CalendarEvent} from 'angular-calendar';
import {parseISO} from 'date-fns';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  activePackageAmount: number;
  scheduleList: any[];
  subPackageDtos: SubPackage[];


}

export interface SubPackage {
  id: string;
  amount: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public player$!: Observable<any>;
  public content!: any;

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: UserService
  ) {}

  ngOnInit(): void {
    this.player$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const playerBoard = this.service.getPlayerBoard(params.get('id'));
          return playerBoard;
        })
    );
    this.player$.subscribe(x => {
      this.content = JSON.parse(x);
    });
    // this.hero$.forEach(value => this.mapFromScheduleToEvent(value.scheduleList));
  }

  private mapFromSchedulesToEvents(schedule: any[]): void {
    schedule.forEach(value => this.mapFromScheduleToEvent(value));
  }

  private mapFromScheduleToEvent(schedule: any): void {
    this.events = [...this.events, {
      title: '@' + schedule.location.name + ' with ' + schedule.trainer.firstName + ' ' + schedule.trainer.lastName
          + ' value: ' + schedule.value + 'kn',
      start: parseISO(schedule.beginning),
      end: parseISO(schedule.end)
    }];
  }
}
