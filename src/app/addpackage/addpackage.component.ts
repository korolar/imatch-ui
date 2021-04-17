import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CalendarEvent} from 'calendar-utils';

@Component({
  selector: 'app-addpackage',
  templateUrl: './addpackage.component.html',
  styleUrls: ['./addpackage.component.css']
})
export class AddpackageComponent implements OnInit {

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

  packagessToAdd: any = [];

  onChange(data: Date): void {
    this.addForm.patchValue({validUntil: this.add6Months(data)});
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

    this.addForm = this.formBuilder.group({
      players: [null, Validators.required],
      amount: [1000, Validators.required],
      purchaseDate: [this.roundMinutes(new Date()), Validators.required],
      validUntil: [this.roundMinutesAddHour(new Date()), Validators.required],
    });
  }

  roundMinutes(date: Date): Date {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
    return date;
  }

  roundMinutesAddHour(date: Date): Date {
    date.setMonth(date.getMonth() + 6);
    date.setMinutes(0, 0, 0);
    return date;
  }

  add6Months(date: Date): Date {
    date.setMonth(date.getMonth() + 6);
    return date;
  }


  onSubmit(): void {
    if (!this.addForm.valid) {
      Swal.fire({
        title: 'Fill all the required data!',
        icon: 'warning'
      });
      return;
    }
    this.packagessToAdd = [...this.packagessToAdd, this.addForm.value];
    this.cd.markForCheck();
    this.addForm.reset();
  }

  onAdd(): void {
    this.userService.addPackage(this.packagessToAdd)
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
            'Your package has been deleted.',
            'success'
        );
        this.packagessToAdd = this.packagessToAdd.filter((event: CalendarEvent) => {
          return event !== eventToDelete;
        });
        this.cd.markForCheck();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelled',
            'Your package item is stil listed',
            'error'
        );
      }
    });
  }
}
