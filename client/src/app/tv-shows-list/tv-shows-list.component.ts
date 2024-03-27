import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Show } from '../types';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.css'],
})
export class TvShowsListComponent implements OnInit {
  tvShows: Show[] | undefined;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getMoviesOrTVShows('tvShow').subscribe((data: Show[]) => {
      this.tvShows = data.slice(0, 5);
      console.log(this.tvShows);
    });
  }
}
