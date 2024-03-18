import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  library: any | undefined | null;
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.apiService.getUserLibrary().subscribe((x) => {
      this.library = Object.values(x).find(
        (y) => y._ownerId == this.userService.user._id
      );
      console.log(this.library);
    });
  }
}
