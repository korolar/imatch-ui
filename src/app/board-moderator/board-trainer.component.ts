import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import { AppRoutingModule } from '../app-routing.module';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-board-trainer',
  templateUrl: './board-trainer.component.html',
  styleUrls: ['./board-trainer.component.css']
})
export class BoardTrainerComponent implements OnInit {
  content: any;
  playedList: boolean[] = [false, true];

  constructor(private userService: UserService,  private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    const user = this.tokenStorage.getUser();
    this.userService.getTrainerBoard(user.id).subscribe(
      data => {
        this.content = JSON.parse(data);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  playedOrNot(played: boolean): string{
    if (played){
      return 'Finished1';
    } else {
      return 'Played';
    }
  }
}
