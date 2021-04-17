import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {MatTableModule} from '@angular/material/table';

@Component({
    selector: 'app-infoplayers',
    templateUrl: './infoplayers.component.html',
    styleUrls: ['./infoplayers.component.css']
})
export class InfoplayersComponent implements OnInit {
    public content: any;

    constructor(private userService: UserService, private tokenStorage: TokenStorageService, private cd: ChangeDetectorRef) {
    }

    public displayedColumns = ['name', 'lastname', 'activePackageAmount'];

    ngOnInit(): void {
        this.userService.getPlayersStatusForOwner(this.tokenStorage.getUser().id).subscribe(
            data => {
                this.content = JSON.parse(data);
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
    }

    public redirectToDetails = (id: string) => {

    }
    public redirectToUpdate = (id: string) => {

    }
    public redirectToDelete = (id: string) => {

    }

}
