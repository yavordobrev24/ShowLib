import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import Show from 'src/types/show';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularComponent implements OnInit {
  @Input() type!: 'movies' | 'tv-shows';
  shows!: Show[];
  baseImageUrl: string = 'https://image.tmdb.org/t/p/original/';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPopularShows(this.type).subscribe(
      (data: any) => {
        if (Array.isArray(data.results)) {
          this.shows = data.results.slice(0, 5);
        } else {
          throw new Error('Unexpected data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
