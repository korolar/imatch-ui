import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  title = 'IMatch';
  showOwnerBoard = false;
  showTrainerBoard = false;
  showScheduleBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showOwnerBoard = this.roles.includes('ROLE_OWNER');
      this.showTrainerBoard = this.roles.includes('ROLE_TRAINER');
      this.showScheduleBoard = this.roles.includes('ROLE_PLAYER');

      this.username = user.username;
    }
    // todo: route all non-loged in user to HomePage
    // todo: route unsuported views to certain roles to ErrorPage -> need  to create ErrorPage
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
