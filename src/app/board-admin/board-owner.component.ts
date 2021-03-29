import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-board-owner',
  templateUrl: './board-owner.component.html',
  styleUrls: ['./board-owner.component.css']
})
export class BoardOwnerComponent implements OnInit {
  content: any;

  constructor(private userService: UserService,  private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getOwnerBoard(this.tokenStorage.getUser().id).subscribe(
      data => {
        this.content = JSON.parse(data);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
