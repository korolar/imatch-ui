import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";


export interface Owner {
    id: string;
    name: string;
    lastName: string;
    activePackageAmount: number;
}

@Component({
    selector: 'app-infoplayers',
    templateUrl: './infoplayers.component.html',
    styleUrls: ['./infoplayers.component.css'],
})
export class InfoplayersComponent implements OnInit, AfterViewInit {
    public content = new MatTableDataSource<Owner>();
    selectedId!: number;

    // tslint:disable-next-line:max-line-length
    constructor(private userService: UserService, private tokenStorage: TokenStorageService, private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    }

    public displayedColumns = ['name', 'lastname', 'activePackageAmount', 'details'];
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.userService.getPlayersStatusForOwner(this.tokenStorage.getUser().id).subscribe(
            data => {
                this.content.data = JSON.parse(data) as Owner[];
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );

        this.route.paramMap.pipe(
            switchMap(params => {
                // (+) before `params.get()` turns the string into a number
                // @ts-ignore
                this.selectedId = +params.get('id');
                return this.userService.getPlayersStatusForOwner(this.tokenStorage.getUser().id);
            })
        );
    }

    ngAfterViewInit(): void {
        this.content.sort = this.sort;
        this.content.paginator = this.paginator;
    }

    public redirectToDetails = (id: string) => {

    }
    public redirectToUpdate = (id: string) => {

    }
    public redirectToDelete = (id: string) => {

    }

    public doFilter = (value: any) => {
        this.content.filter = value.target.value.trim().toLocaleLowerCase();
    }

}
