import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  content: any;

  constructor(private userService: UserService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.userService.getUserBoard(this.currentUser.id).subscribe(
      data => {
        this.content = JSON.parse(data);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
