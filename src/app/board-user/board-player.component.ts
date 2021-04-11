import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {parseISO} from 'date-fns';

@Component({
    selector: 'app-board-player',
    templateUrl: './board-player.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./board-player.component.css'],
})
export class BoardPlayerComponent implements OnInit {
    content: any;
    view: CalendarView = CalendarView.Day;
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];

    constructor(private userService: UserService, private tokenStorage: TokenStorageService, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.userService.getPlayerBoard(this.tokenStorage.getUser().id).subscribe(
            data => {
                this.content = JSON.parse(data);
                this.mapFromSchedulesToEvents(this.content);
                this.cd.markForCheck();
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
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
