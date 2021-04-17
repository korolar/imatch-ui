import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../_services/token-storage.service';
import {CalendarEvent} from 'calendar-utils';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-addschedule',
    templateUrl: './addschedule.component.html',
    styleUrls: ['./addschedule.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddscheduleComponent implements OnInit {

    addForm!: FormGroup;
    refresh: Subject<any> = new Subject();

    constructor(private userService: UserService, private tokenStorage: TokenStorageService,
                private formBuilder: FormBuilder, private cd: ChangeDetectorRef, private router: Router) {
    }

    options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    get getControl(): any {
        return this.addForm.controls;
    }

    players: any;

    trainers: any;

    locations: any = [];

    schedulesToAdd: any = [];

    onChange(data: Date): void {
        if (data != null) {
            this.addForm.patchValue({end: this.addHour(data)});
        }
    }

    setDefaultValue(): void {
            this.addForm.patchValue({end: this.roundMinutesAddHour(new Date())});
            this.addForm.patchValue({beginning: this.roundMinutes(new Date())});
    }

    ngOnInit(): void {
        this.userService.getPlayersForOwner(this.tokenStorage.getUser().id).subscribe(
            data => {
                this.players = JSON.parse(data);
            },
            err => {
                this.players = JSON.parse(err.error).message;
            }
        );

        this.userService.getTrainersForOwner(this.tokenStorage.getUser().id).subscribe(
            data => {
                this.trainers = JSON.parse(data);
            },
            err => {
                this.trainers = JSON.parse(err.error).message;
            }
        );

        this.userService.getAllLocations().subscribe(
            data => {
                this.locations = JSON.parse(data);
            },
            err => {
                this.locations = JSON.parse(err.error).message;
            }
        );

        this.addForm = this.formBuilder.group({
            location: [null, Validators.required],
            trainer: [null, Validators.required],
            players: ['', Validators.required],
            value: ['', Validators.required],
            beginning: [null, Validators.required],
            end: [null, Validators.required],
        });
        this.setDefaultValue();
    }

    roundMinutes(date: Date): Date {
        date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
        date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
        return date;
    }

    roundMinutesAddHour(date: Date): Date {
        date.setHours(date.getHours() + Math.round(date.getMinutes() / 60) + 1);
        date.setMinutes(0, 0, 0);
        return date;
    }

    addHour(date: Date): Date {
        const newDate = new Date(date.getTime());
        newDate.setHours(newDate.getHours() + 1);
        return newDate;
    }


    onSubmit(): void {
        if (!this.addForm.valid) {
            Swal.fire({
                title: 'Fill all the required data!',
                icon: 'warning'
            });
            return;
        }
        this.schedulesToAdd = [...this.schedulesToAdd, this.addForm.value];
        this.cd.markForCheck();
        this.addForm.reset();
        this.setDefaultValue();
    }

    onAdd(): void {
        this.userService.createSchedule(this.schedulesToAdd)
            .subscribe(data => {
                Swal.fire('Success', 'You submitted successfully!', 'success');
                // this.schedulesToAdd = [];
                this.router.navigate(['admin']);
                // this.cd.markForCheck();
            }, err => {
                Swal.fire({
                    title: 'Something went wrong...',
                    text: err.message,
                    icon: 'error'
                });
            });
    }

    showValidationMsg(formGroup: FormGroup): void {

    }

    onDelete(eventToDelete: CalendarEvent): void {

        Swal.fire({
            title: 'Are you sure want to delete?',
            text: 'You will not be able to recover this schedule!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your schedule has been deleted.',
                    'success'
                );
                this.schedulesToAdd = this.schedulesToAdd.filter((event: CalendarEvent) => {
                    return event !== eventToDelete;
                });
                this.cd.markForCheck();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your schedule item is stil listed',
                    'error'
                );
            }
        });
    }
}
