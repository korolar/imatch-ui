import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import { parseISO, format } from 'date-fns';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-board-player',
    templateUrl: './board-player.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./board-player.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BoardPlayerComponent implements OnInit {
    content: any;
    view: CalendarView = CalendarView.Week;
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];
    constructor(private userService: UserService, private tokenStorage: TokenStorageService) {
    }

    ngOnInit(): void {
        this.userService.getPlayerBoard(this.tokenStorage.getUser().id).subscribe(
            data => {
                this.content = JSON.parse(data);
                this.events = this.mapFromSchedulesToEvents(this.content);
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
    }

    private mapFromSchedulesToEvents(schedule: any[]): CalendarEvent[] {
        return schedule.map(value => this.mapFromScheduleToEvent(value));
    }

    private mapFromScheduleToEvent(schedule: any): CalendarEvent {
        return {
            title: '@' + schedule.club + ' with ' + schedule.trainerDto.firstName + ' ' + schedule.trainerDto.lastName
                + ' value: ' + schedule.value + 'kn',
            start: parseISO(schedule.beginning),
            end: parseISO(schedule.end)
        };
    }
}
