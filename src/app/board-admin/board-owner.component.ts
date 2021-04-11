import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {parseISO} from 'date-fns';
import {User} from '../calendar/day-view-scheduler.component';
import {colorsList} from '../calendar/colors';


@Component({
    selector: 'app-board-owner',
    templateUrl: './board-owner.component.html',
    styleUrls: ['./board-owner.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardOwnerComponent implements OnInit {
    content: any;
    view: CalendarView = CalendarView.Day;
    viewDate: Date = new Date();
    users: User[] = [];
    events: CalendarEvent[] = [];

    constructor(private userService: UserService, private tokenStorage: TokenStorageService, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.userService.getOwnerBoard(this.tokenStorage.getUser().id).subscribe(
            data => {
                this.content = JSON.parse(data);
                this.addTrainerToUsers(this.content);
                this.cd.markForCheck();
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
    }

    public mapFromSchedulesToEvents(schedule: any[], user: User): void {
        schedule.forEach(value => this.mapFromScheduleToEvent(value, user));
    }

    private mapFromScheduleToEvent(schedule: any, user2: User): void {
        this.events = [...this.events, {
            title: '@' + schedule.location.name + ' value ' + schedule.value + 'kn' + ' ' + this.getAllPlayersAsString(schedule.players),
            start: parseISO(schedule.beginning),
            end: parseISO(schedule.end),
            color: user2.color,
            meta: {
                user: user2,
            },
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

    private addTrainerToUsers(trainer: any[]): void {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < trainer.length; i++) {
            const user = {
                id: i,
                name: trainer[i].firstName + ' ' + trainer[i].lastName,
                color: colorsList[i],
            };
            this.users = [...this.users, user];
            this.mapFromSchedulesToEvents(trainer[i].scheduleList, user);
        }
    }

    eventTimesChanged({
                          event,
                          newStart,
                          newEnd,
                      }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.events = [...this.events];
    }

    userChanged({event, newUser}: any): void {
        event.color = newUser.color;
        event.meta.user = newUser;
        this.events = [...this.events];
    }
}
