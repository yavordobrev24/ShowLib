import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from 'src/app/api.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  findForm = new FormGroup({
    selectedType: new FormControl('both'),
  });
  selectedType: any = '';
  shows: any;
  library: any;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let lsLib: any = localStorage.getItem('library');
    this.library = JSON.parse(lsLib);
    this.findForm
      .get('selectedType')
      ?.valueChanges.subscribe((selectedType) => {
        this.selectedType = selectedType;
        console.log('Changed value:', this.selectedType);

        if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
          this.shows = this.library.savedShows.filter(
            (show: any) => show.type == this.selectedType
          );
        } else {
          this.shows = this.library.savedShows;
        }
      });
    if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
      this.shows = this.library.savedShows.filter(
        (show: any) => show.type == this.selectedType
      );
    } else {
      this.shows = this.library.savedShows;
    }
  }
}
