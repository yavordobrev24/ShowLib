import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  library: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    let lsLib: any = localStorage.getItem('library');
    this.library = JSON.parse(lsLib);
  }
}
