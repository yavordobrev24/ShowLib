import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  logout() {
    this.userService.logout();
  }
  onSearch(searchValue: string) {
    console.log(searchValue);

    return;
  }
}
