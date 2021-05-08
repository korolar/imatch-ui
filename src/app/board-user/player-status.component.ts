import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';

@Component({
    selector: 'app-player-status',
    template: `
        <div>
            <app-mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate">
            </app-mwl-demo-utils-calendar-header>

            <div [ngSwitch]="view">
                <mwl-calendar-month-view
                        *ngSwitchCase="'month'"
                        [viewDate]="viewDate"
                        [events]="events"
                >
                </mwl-calendar-month-view>
                <mwl-calendar-week-view
                        *ngSwitchCase="'week'"
                        [viewDate]="viewDate"
                        [events]="events"
                        [dayStartHour]=7
                        [dayEndHour]=19
                >
                </mwl-calendar-week-view>
                <mwl-calendar-day-view
                        *ngSwitchCase="'day'"
                        [viewDate]="viewDate"
                        [events]="events"
                        [dayStartHour]=7
                        [dayEndHour]=19
                >
                </mwl-calendar-day-view>
            </div>


            <h3 class="text-center">Packages</h3>
            <h2 class="text-center">Left amount: {{content.activePackageAmount}}</h2>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>Purchase date</th>
                    <th>Valid untill</th>
                </tr>
                </thead>
                <tbody>
                <tr class="custom" *ngFor="let package of content.subPackageDtos">
                    <td>{{package.id}}</td>
                    <td>{{package.amount}}</td>
                    <td>{{package.purchaseDate}}</td>
                    <td>{{package.validUntil}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <br/>
    `,
})
export class PlayerStatusComponent {
    @Input() viewDate: Date = new Date();

    @Input() view: CalendarView = CalendarView.Day;

    @Input() content: any;

    @Input() events: CalendarEvent[] = [];
}
