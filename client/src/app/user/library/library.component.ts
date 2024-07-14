import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Library } from 'src/types/library';
import { Show } from 'src/types/show';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  findForm = new FormGroup({
    selectedType: new FormControl('both'),
  });
  selectedType: string | null = '';
  shows: Show[] | undefined;
  library: Library | undefined | null;

  constructor() {}

  ngOnInit(): void {
    let lsLib: string | null = localStorage.getItem('library');
    if (lsLib) {
      this.library = JSON.parse(lsLib);
      this.findForm
        .get('selectedType')
        ?.valueChanges.subscribe((selectedType) => {
          this.selectedType = selectedType;
          console.log('Changed value:', this.selectedType);

          if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
            this.shows = this.library?.savedShows.filter(
              (show: Show) => show.type == this.selectedType
            );
          } else {
            this.shows = this.library?.savedShows;
          }
        });
      if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
        this.shows = this.library?.savedShows.filter(
          (show: Show) => show.type == this.selectedType
        );
      } else {
        this.shows = this.library?.savedShows;
      }
    }
  }
}
