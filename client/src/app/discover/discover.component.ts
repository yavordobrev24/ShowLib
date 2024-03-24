import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service'; // Replace with your actual API service import

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent implements OnInit {
  discoverForm = new FormGroup({
    selectedType: new FormControl('both'),
  });
  selectedType: any = '';
  shows: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.discoverForm
      .get('selectedType')
      ?.valueChanges.subscribe((selectedType) => {
        this.selectedType = selectedType;
        console.log('Changed value:', this.selectedType);

        if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
          this.apiService
            .getMoviesOrTVShows(this.selectedType)
            .subscribe((shows: any) => {
              this.shows = shows;
            });
        } else {
          this.apiService.getAllShows().subscribe((shows: any) => {
            this.shows = shows;
          });
        }
      });
    if (this.selectedType == 'movie' || this.selectedType == 'tvShow') {
      this.apiService
        .getMoviesOrTVShows(this.selectedType)
        .subscribe((shows: any) => {
          this.shows = shows;
        });
    } else {
      this.apiService.getAllShows().subscribe((shows: any) => {
        this.shows = shows;
      });
    }
  }
}
