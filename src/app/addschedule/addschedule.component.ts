import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../_services/token-storage.service';
import {CalendarEvent} from 'calendar-utils';
import Swal from 'sweetalert2';

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
                private formBuilder: FormBuilder, private cd: ChangeDetectorRef) {
    }

    options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    players: any;

    trainers: any;

    locations: any = [];

    selectedPlayers: any = [];

    selectedTrainer: any = [];

    selectedLocation: any = [];

    schedulesToAdd: any = [];

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
            location: ['', Validators.required],
            trainer: ['', Validators.required],
            players: ['', Validators.required],
            value: ['', Validators.required],
            beginning: ['', Validators.required],
            end: ['', Validators.required],
        });
    }


    onSubmit(): void {
        this.schedulesToAdd = [...this.schedulesToAdd, this.addForm.value];
        this.cd.markForCheck();
        this.addForm.reset();
    }

    onAdd(): void {
        this.userService.createSchedule(this.schedulesToAdd)
            .subscribe(data => {
                Swal.fire('Success', 'You submitted successfully!', 'success');
                this.schedulesToAdd = [];
                this.cd.markForCheck();
            },     err => {
                Swal.fire({
                    title: 'Something went wrong...',
                    text: err.message,
                    icon: 'error'});
            });
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
