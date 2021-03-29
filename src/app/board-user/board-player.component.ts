import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-board-player',
  templateUrl: './board-player.component.html',
  styleUrls: ['./board-player.component.css']
})
export class BoardPlayerComponent implements OnInit {
  content: any;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getPlayerBoard(this.tokenStorage.getUser().id).subscribe(
      data => {
        this.content = JSON.parse(data);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
