import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {parseISO} from 'date-fns';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-board-trainer',
    templateUrl: './board-trainer.component.html',
    styleUrls: ['./board-trainer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardTrainerComponent implements OnInit {
    content: any;
    view: CalendarView = CalendarView.Day;
    viewDate: Date = new Date();
    public localID: string;
    events: CalendarEvent[] = [];

    // tslint:disable-next-line:max-line-length
    constructor(private userService: UserService, private tokenStorage: TokenStorageService, private cd: ChangeDetectorRef,  @Inject( LOCALE_ID ) localID: string, private datePipe: DatePipe ) {
        this.localID = localID;
    }

    ngOnInit(): void {
        const user = this.tokenStorage.getUser();
        this.userService.getTrainerBoard(user.id).subscribe(
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

    public mapFromSchedulesToEvents(schedule: any[]): void {
        schedule.forEach(value => this.mapFromScheduleToEvent(value));
    }

    private mapFromScheduleToEvent(schedule: any): void {
        this.events = [...this.events, {
            title: '@' + schedule.location.name + ' value ' + schedule.value + 'kn' + ' ' + this.getAllPlayersAsString(schedule.players),
            start: parseISO(schedule.beginning),
            end: parseISO(schedule.end)
        }];
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
